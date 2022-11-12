import React, { createRef, useEffect, useState } from 'react'
import moment from 'moment';
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { ChatState } from '../../Context/ChatContext';
import { getUserName, getUser } from '../../config/chatLogics';
import axios from 'axios';
import io from 'socket.io-client'

// material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Lottie from 'lottie-react';
import lottieTyping from '../lottie_Animations/typing.json'


const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const ChatContent = () => {
  const msgRef = createRef(null)
  const [userChats, setUserChats] = useState([])
  const [msg, setMsg] = useState('');
  const[socket_conection, setSocket_connection] = useState(false);
  const [istyping, setIstyping] = useState(false);
  const [typing, setTyping] = useState(false);
  
  // Material UI Modal...
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center',
      // padding: theme.spacing(3)
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      padding: theme.spacing(3, 5, 3),
      maxHeight: theme.spacing(37),
      display: 'block',
      overflowY: 'auto',
      margin: 'auto'
    },
    center: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }));
  const classes = useStyles();
  const [open, setOpen] = useState(false) // modal state


  // extracting states from context api
  const { user, selectedChat, setSelectedChat } = ChatState();

  function scrollToBottom(){
    msgRef.current.scrollIntoView({ behavior: "smooth" });
  }

  // add new message
  const addNewMessage = async (chat_id)=>{
    
    if(msg.length < 1) return;
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
      socket.emit('new_Message', data)
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

      
      if(data.length > 0){
        let msgArr = [];
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
        socket.emit('Chat_Conn', selectedChat._id)
      }
    }
    catch(err){
      console.log(err)
    }
  }
  
  // typing handler input message
  const onStateChange = (e)=>{
    setMsg(e.target.value);
    if(!socket_conection) return;

    if(!typing){
      console.log("socket")
      setTyping(true);
      socket.emit("typing", selectedChat._id)
      let old_time = new Date().getTime();
      let time = 2000;
      setTimeout(()=>{
        let newTime = new Date().getTime();
        const diff_time = newTime - old_time;
        if(diff_time >= time){
          socket.emit('end_typing', selectedChat._id);
          setTyping(false)
        }
      }, time)
    }
  }

  //--------------------    USE-EFFECTS   -----------------//
  useEffect(()=> {
    setUserChats([])
    fetchAllMessges();
    selectedChatCompare = selectedChat;
  } , [selectedChat]) 

  // socket useEffect
  useEffect(()=>{
    if(user){
      socket = io(ENDPOINT);
      socket.emit('setup', user);
      socket.on('Socket_connection', ()=> setSocket_connection(true) )
      socket.on("typing", ()=> setIstyping(true))
      socket.on("end_typing", ()=> setIstyping(false))
    }
  }, [user])

  useEffect(()=>{
    if(socket){
      socket.on('message_recived', (newMessage)=>{
        if(!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id ){
          // new notification
        }
        else{
          let message = {
            key: newMessage._id,
            image: newMessage.sender.picture,
            type: (()=>{
              if(newMessage.sender._id === user._id) return "me"
              else return "other"
            })(),
            msg: newMessage.content,
            date: newMessage.createdAt
          }
          setUserChats([...userChats, message])
        }
      })
    }
  })

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
            <button className="btn-nobg" onClick={()=> setOpen(true)}>
              <i className="fa fa-eye"></i>
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
                sendedStatus = {moment(itm.date).format("hh:mm a")}
                // moment(itm.updatedAt).format("hh:mm a") new Date("2022-11-04T02:50:02.736Z")
              />
            );
          })}
          <div ref={msgRef} />
        </div>
      </div>

      <div className="content__footer">
        { 
          istyping && <div>
            <Lottie animationData={lottieTyping} loop={true} autoplay={true} style={{width: '50px',}} />  
          </div>
        }
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

      {/* view profile of chat user */}
      <Modal
          aria-labelledby="user-profile-modal"
          aria-describedby="user-profile-description"
          className={classes.modal}
          open={open}
          onClose={()=> setOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            
            {
              <div className={"profile__card " + classes.paper}>
                <div className={classes.center}>
                  <div className="profile__image">
                    <img src={selectedChat.isGroupChat ? 
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" : 
                          getUser(user, selectedChat.users).picture} 
                    alt="#" />
                  </div>

                  <h5 id="user-profile-modal"> 
                    { selectedChat.isGroupChat ? selectedChat.chatName :  getUser(user, selectedChat.users).name } 
                  </h5>
                </div>

                {
                  !selectedChat.isGroupChat ?
                  <p id="user-profile-description">{getUser(user, selectedChat.users).email}</p>
                  :
                  selectedChat.users.map(user=>{
                    return(
                      <div className={`chatlist__item add-user group_chat_users`} key={user._id} >
                        <Avatar image={user.picture} />

                        <div className="userMeta">
                            <h5 className="user-title"> { user.name } </h5>
                        </div>

                        <IconButton aria-label="delete" className={`${classes.margin}`}>
                          <DeleteIcon fontSize="small"/>
                        </IconButton>
                      </div>
                    )
                  })
                }
              </div>
              
            }
          </Fade>
      </Modal>
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