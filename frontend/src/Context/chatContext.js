import React, {useState, createContext, useContext} from 'react'

const chat = createContext();

const ChatContext = ({children}) => {
    const [user, setUser] = useState()
    return  (
        <chat.Provider value={{user, setUser}}> {children} </chat.Provider>
    )
}

export const ChatState = ()=> {
    return useContext(chat)
}

export default ChatContext
