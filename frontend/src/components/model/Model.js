import React, { useEffect, useState } from "react";
import "./model.css";
import Avatar from "../chatList/Avatar";
import axios from "axios";
import { ChatState } from '../../Context/ChatContext'
// material ui....
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';

function Modal({toggleModel}) {
    // context api...
    const {user, setSelectedChat, chats, setChats} = ChatState();
    let [search, setSearch] = useState(""); 
    const [searchResult, setSearchResult] = useState([]);
    const [activeTab, setActiveTab] = useState(0) //toggle state
    const [groupChatName, setgroupChatName] = useState('');
    const [groupChatUsers, setgroupChatUsers] = useState('');
    const [error, setError] = useState(undefined);

    function removeAlert(){
        setTimeout(() => {
            setError(undefined)
        }, 2000);
    }

    async function fetchResults(){
        if(!search){
            alert("Please enter something to search")
            return;
        }
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const {data} = await axios.get(`api/user?filter=${search}`, config)
            if(!data.length>0) {setError("User not found"); removeAlert()}
            else setSearchResult(data)
            
        }
        catch(err){
            console.log(err, "error occured")
        }
    }

    const accesChat = async (userId)=>{
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const {data} = await axios.post('api/chat', {userId: userId}, config);
            const isChatAvailable = chats.find((chat)=> chat._id === data._id);
            if(!isChatAvailable) {
                setChats([data, ...chats])
            }
            setSelectedChat(data);
            toggleModel(false)
        }
        catch(err){
            console.log(err)
        }
    }

    const handleGroup = (user)=>{
        if(groupChatUsers.includes(user)){
            alert("user alreaady added")
            return
        }
        setgroupChatUsers([...groupChatUsers, user]);
    }

    const creatGroupChat = async ()=>{
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }
            const { data } = await axios.post('api/chat/group', {
                name: groupChatName,
                users: JSON.stringify(groupChatUsers)
            }, config);

            if(data){
                console.log(data)
                setChats([data, ...setChats])
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">

                <button onClick={()=> toggleModel(false)} className="btn-close">✖</button>

                <div className="card-header">
                    {/* header content  */}
                    <div className="flex justify-between mb-3">
                        <Button variant={`${activeTab === 0 ? 'contained' : 'outlined'}`} 
                            color="primary" className={`btn-model-chat ${activeTab === 0 && 'active-tab '}`} onClick={()=> setActiveTab(0)}> 
                            single chat 
                        </Button>
                        <Button variant={`${activeTab === 1 ? 'contained' : 'outlined'}`} 
                            color="primary" className={`btn-model-chat ${activeTab === 1 && 'active-tab '}`} onClick={()=> setActiveTab(1)}> 
                            group chat 
                        </Button>
                    </div>

                    <div className="chatList__search group-conversation">
                        {activeTab === 1 && <div className="search_wrap">
                            <input type="text" placeholder="Group Name" onChange={(e)=> setgroupChatName(e.target.value)}/>
                        </div>}
                        <div className="search_wrap">
                            <input type="text" placeholder="Add user" onChange={(e)=> { setSearch(e.target.value) } }/>
                            <button className="search-btn" onClick={fetchResults}>
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    
                    {   activeTab === 1 &&  
                        <div display="flex">
                            <Button variant="contained" 
                                color="primary" onClick={creatGroupChat} > 
                                create group chat 
                            </Button>
                        </div>
                    }
                </div>
                
                {/* searched user list */}
                {   error ?  
                    <Alert severity="error">{error}</Alert> 
                    : 
                    searchResult.map( (user)=>( 
                        <div className={`chatlist__item add-user`} key={user._id} 
                            onClick={ ()=> activeTab === 0 ? accesChat(user._id) : handleGroup(user._id) } >
                            <Avatar image={ user.picture } />

                            <div className="userMeta">
                                <h5 className="user-title"> { user.name } </h5>
                                <p className=""> <strong>{ user.email }</strong></p> 
                            </div>
                        </div>
                    ) )
                }

            </div>
        </div>
    );
}

export default Modal;