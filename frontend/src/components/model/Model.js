import React, { useEffect, useState } from "react";
import "./model.css";
import Avatar from "../chatList/Avatar";
import axios from "axios";
import { ChatState } from '../../Context/ChatContext'
// material ui....
import Button from '@material-ui/core/Button';

function Modal({toggleModel}) {
    const {user, setSelectedChat, chats, setChats} = ChatState();
    let [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [activeTab, setActiveTab] = useState(0)

    async function fetchResults(){
        if(!search)
            alert("Please enter something to search")
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const {data} = await axios.get(`api/user?filter=${search}`, config)

            setSearchResult(data)
            
        }
        catch(err){
            console.log(err)
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

    return (
        <div className="modalBackground">
            <div className="modalContainer">

                <button onClick={()=> toggleModel(false)} className="btn-close">✖</button>

                <div className="card-header">
                    {/* header content  */}
                    <div className="flex justify-between mb-3">
                        {/* <Button variant="outlined" color="primary" className={`btn-model-chat ${activeTab === 0 && 'active-tab '}`} > single chat </Button> */}
                        {/* <button className={`btn btn-model-chat ${activeTab === 1 && 'active-tab '}`} onClick={()=> setActiveTab(1)}> group chat </button> */}
                        <Button variant={`${activeTab === 0 ? 'contained' : 'outlined'}`} 
                            color="primary" className={`btn-model-chat ${activeTab === 0 && 'active-tab '}`} onClick={()=> setActiveTab(0)}> 
                            single chat 
                        </Button>
                        <Button variant={`${activeTab === 1 ? 'contained' : 'outlined'}`} 
                            color="primary" className={`btn-model-chat ${activeTab === 1 && 'active-tab '}`} onClick={()=> setActiveTab(1)}> 
                            group chat 
                        </Button>
                        {/* <Button variant="outlined" color="primary" className="btn-model-chat active-tab"> Primary </Button> */}
                        {/* <button className="btn btn-model-chat"> single chat </button> */}
                    </div>
                    <div className="chatList__search group-conversation">
                        {activeTab === 1 && <div className="search_wrap">
                            <input type="text" placeholder="Group Name" />
                        </div>}
                        <div className="search_wrap">
                            <input type="text" placeholder="Add user" onChange={(e)=> { setSearch(e.target.value) } }/>
                            <button className="search-btn" onClick={fetchResults}>
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    
                    {activeTab === 1 &&  <Button variant="contained"
                                color="primary" className={`btn-model-chat`} onClick={fetchResults} > 
                                group chat 
                            </Button>}
                </div>
                {/* searched user list */}
                {
                    (searchResult.length>0) && 
                    searchResult.map( (user)=>( 
                        <div className={`chatlist__item add-user`} key={user._id} onClick={()=>accesChat(user._id)} >
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