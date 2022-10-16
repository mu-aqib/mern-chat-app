import React, {useState, createContext, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const chat = createContext();

const ChatContext = ({children}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState();

    useEffect(()=>{
        const user_info = JSON.parse(localStorage.getItem('userInfo'))

        setUser(user_info)

        if(!user_info){
            navigate('/')
        }
    },[])

    return  (
        <chat.Provider value={{user, setUser}}> {children} </chat.Provider>
    )
}

export const ChatState = ()=> {
    return useContext(chat)
}

export default ChatContext
