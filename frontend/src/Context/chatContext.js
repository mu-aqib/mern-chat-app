import React, { useState, createContext, useContext} from 'react'

const chat = createContext();

const chatContext = ({children}) => {
    // const [user, setUser] = useState()
    return  (
        <chat.Provider > {children} </chat.Provider>
    )
}

export default chatContext
