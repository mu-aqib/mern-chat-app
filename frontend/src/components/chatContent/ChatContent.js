import React, { createRef, useEffect, useState } from 'react'
import moment from 'moment';
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { ChatState } from '../../Context/ChatContext';
import { getUserName, getUser } from '../../config/chatLogics';
import axios from 'axios';

const ChatContent = () => {
  const msgRef = createRef(null)
  const [userChats, setUserChats] = useState([])
  const [msg, setMsg] = useState('');
  // const [newMessage]

  // extracting states from context api
  const { user, selectedChat, setSelectedChat } = ChatState();

  function scrollToBottom(){
    msgRef.current.scrollIntoView({ behavior: "smooth" });
  }

  // add new message
  const addNewMessage = async (chat_id)=>{
    console.log(moment("2022-11-04T19:02:18.547Z").format("hh:mm a"))
    
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
          type: "me",
          msg: data.content,
        };

        setUserChats([...userChats, newData])
      }
      catch(err){
        console.log(err)
      }

  }

  // fetch All chats by selected user
  const fetchAllMessges = async ()=>{
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      let {data} = await axios.get(`api/message/${selectedChat._id}`, config)

      let msgArr = [];

      if(data.length > 0){
        data.forEach(msg => {

          let message = {
            key: msg._id,
            image: msg.sender.picture,
            type: (()=>{
              if(msg.sender._id === user._id) return "me"
              else return "other"
            })(),
            msg: msg.content,
            date: msg.createdAt
          }
          msgArr.push(message);

        });
        setUserChats(msgArr);
      }
    }
    catch(err){
      console.log(err)
    }
  }
  
  const onStateChange = (e)=>{
    setMsg(e.target.value)
  }

  // Function for time
  // function formatAMPM(time) {
  //   let date = new Date(time);
  //   var hours = date.getHours();
  //   var minutes = date.getMinutes();
  //   var ampm = hours >= 12 ? 'pm' : 'am';
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'
  //   minutes = minutes < 10 ? '0'+minutes : minutes;
  //   var strTime = hours + ':' + minutes + ' ' + ampm;
  //   return strTime;
  // }

  //--------------------    USE-EFFECTS   -----------------//
  useEffect(()=> {
    setUserChats([])
    fetchAllMessges();
  } , [selectedChat]) 

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
            console.log(itm)
            return (
              <ChatItem
                animationDelay={index + 2}
                key={itm.key}
                user={itm.type ? itm.type : "me"}
                msg={itm.msg}
                image={itm.image}
                sendedStatus = {moment(itm.date).format("hh:mm a")}
                // moment(itm.updatedAt).format("hh:mm a") new Date("2022-11-04T02:50:02.736Z")
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
