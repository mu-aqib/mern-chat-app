import React from 'react';
import { useNavigate } from "react-router-dom";
import "./userProfile.css";
import { ChatState } from '../../Context/ChatContext';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = ChatState();

  function logginOut (e){
    localStorage.removeItem('userInfo')
    navigate('/')
  };

  const toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };

  return (
    <div className="main__userprofile">
      <button className="btn lg-btn btn-logout" onClick={logginOut}>
        <i className="fa fa-sign-out"></i>
        <span>Logout</span>
      </button>
      {user &&
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <img src={user.picture} />
          </div>
          <h5>{user.name}</h5>
          <p>{user.email}</p>
        </div>
      }
      
      <div className="profile__card">
        <div className="card__header" onClick={(e)=> toggleInfo(e)}>
          <h4>Information</h4>
          <i className="fa fa-angle-down"></i>
        </div>
        <div className="card__content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          ultrices urna a imperdiet egestas. Donec in magna quis ligula
        </div>
      </div>

    </div>
  );

}

export default UserProfile
