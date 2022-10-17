import React, { Component } from 'react'
import ChatList from "../components/chatList/ChatList";
import ChatContent from "../components/chatContent/ChatContent";
import UserProfile from "../components/userProfile/UserProfile";


export default class chatPage extends Component {

    render() {
        
        return (
            <div className="main__chatbody">
                <ChatList />
                <ChatContent />
                <UserProfile />
            </div>
        )
    }
}
