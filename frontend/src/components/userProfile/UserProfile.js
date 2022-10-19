import React from 'react';
import { useNavigate } from "react-router-dom";
import "./userProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();

  function logginOut (e){
    localStorage.removeItem('userInfo')
    navigate('/')
  };

  // toggleInfo = (e) => {
  //   e.target.parentNode.classList.toggle("open");
  // };

  return (
    <div className="main__userprofile">
      <button className="btn btn-logout" onClick={logginOut}>
        <i className="fa fa-sign-out"></i>
        <span>Logout</span>
      </button>
      <div className="profile__card user__profile__image">
        <div className="profile__image">
          <img src="https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg" />
        </div>
        <h4>Fernando Faucho</h4>
        <p>CEO & Founder at Highly Inc</p>
      </div>
      
      {/* <div className="profile__card">
        <div className="card__header" onClick={this.toggleInfo}>
          <h4>Information</h4>
          <i className="fa fa-angle-down"></i>
        </div>
        <div className="card__content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          ultrices urna a imperdiet egestas. Donec in magna quis ligula
        </div>
      </div> */}

    </div>
  );

}

export default UserProfile
