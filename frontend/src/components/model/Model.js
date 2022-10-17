import React, { useState } from "react";
import "./model.css";
import Avatar from "../chatList/Avatar";

function Modal({toggleModel}) {

    return (
        <div className="modalBackground">
        <div className="modalContainer">

            <button onClick={()=> toggleModel(false)} class="btn-close">✖</button>

            <div className="card-header">
                {/* header content  */}
                <div className="chatList__search">
                    <div className="search_wrap">
                        <input type="text" placeholder="Search Here" required />
                        <button className="search-btn">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div className={`chatlist__item add-user`} >
                    <Avatar image="https://res.cloudinary.com/cloudymedia313/image/upload/v1665229013/vvfshghefbwmojavjqdy.jpg" />

                    <div className="userMeta">
                        <h5 className="user-title">Muhammad Aqib</h5>
                        <p className=""> <strong>Email</strong> aqibafridi0345@gmail.com </p>
                    </div>
                </div>
                <div className={`chatlist__item add-user`} >
                    <Avatar image="https://res.cloudinary.com/cloudymedia313/image/upload/v1665229013/vvfshghefbwmojavjqdy.jpg" />

                    <div className="userMeta">
                        <h5 className="user-title">Muhammad Aqib</h5>
                        <p className=""> <strong>Email</strong> aqibafridi0345@gmail.com </p>
                    </div>
                </div>
            </div>

        </div>
        </div>
    );
}

export default Modal;