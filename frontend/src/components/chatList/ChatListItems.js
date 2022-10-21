import React, { Component } from "react";
import Avatar from "./Avatar";


export default class ChatListItems extends Component {
  constructor(props) {
    super(props);
    console.log(props.activeChat)
  }


  render() {
    return (
      <div
        onClick={() => {this.props.customEvent(this.props.chat)}}
        style={{ animationDelay: `0.${this.props.animationDelay}s` }}
        className={`chatlist__item ${ this.props.activeChat } `}
      >
        <Avatar
          image={
            this.props.image ? this.props.image : "http://placehold.it/80x80"
          }
          isOnline={this.props.isOnline}
        />

        <div className="userMeta">
          <p>{this.props.name}</p>
          <span className="activeTime">32 mins ago</span>
        </div>
      </div>
    );
  }
}
