import React, { useEffect, useState } from "react";
import "./model.css";
import Avatar from "../chatList/Avatar";
import axios from "axios";
import { ChatState } from '../../Context/ChatContext'

function Modal({toggleModel}) {
    const {user, setSelectedChat, chats, setChats} = ChatState();
    let [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([])

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
                    <div className="flex mb-3">
                        <button className="btn btn-model-chat"> single chat </button>
                        <button className={'btn btn-model-chat active-tab'}> group chat </button>
                    </div>
                    <div className="chatList__search group-conversation">
                        <div className="search_wrap">
                            <input type="text" placeholder="Group Name" />
                        </div>
                        <div className="search_wrap">
                            <input type="text" placeholder="Add user" onChange={(e)=> { setSearch(e.target.value) } }/>
                            <button className="search-btn" onClick={fetchResults}>
                                <i className="fa fa-search"></i>
                            </button>
                        </div>

                    </div>
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