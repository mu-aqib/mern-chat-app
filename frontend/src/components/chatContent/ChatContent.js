import React, { createRef, useEffect, useState } from 'react'
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { ChatState } from '../../Context/ChatContext';
import { getUserName, getUser } from '../../config/chatLogics';
import axios from 'axios';

const ChatContent = () => {
  const msgRef = createRef(null)
  const [userChats, setUserChats] = useState([
    {
      key: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "Finally. What's the plan?",
    },
    {
      key: 6,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "what plan mate?",
    },
    {
      key: 7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I'm taliking about the tutorial",
    },
  ])
  const [msg, setMsg] = useState('');
  // const [newMessage]

  // extracting states from context api
  const { user, selectedChat, setSelectedChat } = ChatState();

  function scrollToBottom(){
    msgRef.current.scrollIntoView({ behavior: "smooth" });
  }

  // add new message
  const addNewMessage = async (chat_id)=>{
    if(msg.length < 1)
      return;
      try{
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const {data} = await axios.post('api/message', {
          message: msg,
          chatID: chat_id
        }, config)
    
        setMsg("")

        let newData = {
          key: data._id,
          image: data.sender.picture,
          type: "",
          msg: data.content,
        };
        
        setUserChats([...userChats, newData])
      }
      catch(err){
        console.log(err)
      }
    // console.log(chat_id);
  }
  
  const onStateChange = (e)=>{
    setMsg(e.target.value)
  }

  useEffect(()=>{
    // scrollToBottom();
  }, [userChats])

  return ( 
    selectedChat ?   
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar
              isOnline="active"
              image={ selectedChat.isGroupChat ? 
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU' : 
                getUser(user, selectedChat.users).picture
              }
            />
            <p>{selectedChat.isGroupChat ? selectedChat.chatName : getUserName(user, selectedChat.users)}</p>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>

      </div>

      <div className="content__body">
        <div className="chat__items">
          {userChats.map((itm, index) => {
            return (
              <ChatItem
                animationDelay={index + 2}
                key={itm.key}
                user={itm.type ? itm.type : "me"}
                msg={itm.msg}
                image={itm.image}
              />
            );
          })}
          <div ref={msgRef} />
        </div>
      </div>

      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={onStateChange}
            value={msg}
          />
          <button className="btnSendMsg" id="sendMsgBtn" onClick={()=>addNewMessage(selectedChat._id)}>
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
    :  
    <div className="main__chatcontent"> 
      <h2 style={{margin: 'auto', color: "#b6b0ac" }}> 
        <i className="fa fa-commenting-o" aria-hidden="true"></i> Not selecte chat yet.
      </h2> 
    </div>
  )
}

export default ChatContent
