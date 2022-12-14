import React, {useState, createContext, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const chat = createContext();

const ChatContext = ({children}) => {
    const [user, setUser] = useState(undefined);
    const [selectedChat, setSelectedChat] = useState("");
    const [chats, setChats] = useState([])

    const navigate = useNavigate();

    // for validation if user is loggesin or not
    useEffect( ()=>{
        const user_info =  JSON.parse(localStorage.getItem('userInfo'))

        setUser(user_info)

        if(!user_info){
            navigate('/')
        }
    },[navigate])

    return  (
        <chat.Provider value={{user, setUser, selectedChat, setSelectedChat, chats, setChats}}> {children} </chat.Provider>
    )
}

export const ChatState = ()=> {
    return useContext(chat)
}

export default ChatContext
