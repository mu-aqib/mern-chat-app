import React, { useEffect, useState } from 'react'
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import Modal from "../model/Model";
import { ChatState } from '../../Context/ChatContext';
import axios from 'axios';
import { getUserName } from '../../config/chatLogics'

function ChatList() {
  // const allChatUsers = [
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
  //     id: 1,
  //     name: "Tim Hover",
  //     active: true,
  //     isOnline: true,
  //   },
  //   {
  //     image:
  //       "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
  //     id: 2,
  //     name: "Ayub Rossi",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
  //     id: 3,
  //     name: "Hamaad Dejesus",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
  //     id: 4,
  //     name: "Eleni Hobbs",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
  //     id: 5,
  //     name: "Elsa Black",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image:
  //       "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
  //     id: 6,
  //     name: "Kayley Mellor",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image:
  //       "https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png",
  //     id: 7,
  //     name: "Hasan Mcculloch",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image:
  //       "https://auraqatar.com/projects/Anakalabel/media//vesbrand/designer4.jpg",
  //     id: 8,
  //     name: "Autumn Mckee",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
  //     id: 9,
  //     name: "Allen Woodley",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image: "https://pbs.twimg.com/profile_images/770394499/female.png",
  //     id: 10,
  //     name: "Manpreet David",
  //     active: false,
  //     isOnline: true,
  //   },
  // ];
  // states
  const [loggedUser, setLoggedUser] = useState(null);
  // const [allChats, setAllchats] = useState(allChatUsers)
  const [toggleModel, setToggleModel] = useState(false)

  // extracting states from context api
  
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  function setActiveChat(chat){
    console.log(chat);
    alert();
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
      fetchChats(); 
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, [user])


  return (
    <div className="main__chatlist">
      {/* add new conversation */}
      <button className="btn" onClick={()=> {setToggleModel(true);}}>
        <i className="fa fa-plus"></i>
        <span>New conversation</span>
      </button>

      <div className="chatlist__heading">
        <h2>Chats</h2>
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
     
      </div>

      <div className="chatlist__items">

        {chats.length > 0 && chats.map((item, index) => {
          return (
            <ChatListItems
              customEvent = {setActiveChat}
              name={item.isGroupChat ? item.chatName : getUserName(loggedUser, item.users) }
              key={item._id}
              animationDelay={index + 1}
              activeChat={selectedChat === item ? "active" : ''}
              isOnline={"active"}
              image={item.users[1].picture}
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
