import React, { useEffect, useState } from 'react'
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import Modal from "../model/Model";
import { ChatState } from '../../Context/ChatContext';
import axios from 'axios';
import { getUserName, getUser } from '../../config/chatLogics'

function ChatList() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [toggleModel, setToggleModel] = useState(false)
  const [activeUserChat, setactiveUserChat] = useState('dfsdf')

  // extracting states from context api
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  function setActiveChat(chat){
    setSelectedChat(chat);
  }

  const fetchChats = async () => {
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } 
    catch (error) {
      console.log(error)
    }
    
  };

  useEffect(()=>{
    if(user) {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats(); 
    }
  }, [user])

  useEffect( ()=> {
    // if(selectedChat){
      const isChatAvailable = chats.find((chat)=> chat._id === selectedChat._id);
      setactiveUserChat(isChatAvailable);
    // }
  }, [selectedChat] )

  
  return (
    <div className="main__chatlist"> 
      <div className="chatlist__heading">

        <h2>Chats</h2>
        <button className="btn btn-nobg" onClick={()=> {setToggleModel(true);}}>
          <i className="fa fa-plus"></i>
        </button>
     
      </div> 

      <br />

      <div className="chatlist__items">
        {loggedUser && chats.length > 0 && chats.map((item, index) => {
          return (
            <ChatListItems
              customEvent = {setActiveChat}
              chat = {item}
              name={item.isGroupChat ? item.chatName : getUserName(loggedUser, item.users) }
              key={item._id}
              animationDelay={index + 1}
              activeChat={item === activeUserChat ? "active" : ""}
              isOnline={"active"}
              image={item.isGroupChat ? 
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU' : 
                getUser(loggedUser, item.users).picture}
            />
          );
        })}
      </div>

        {/* toggle model for searching user */}
        { toggleModel && <Modal toggleModel={setToggleModel}/> }
    </div>
  );
}

export default ChatList
