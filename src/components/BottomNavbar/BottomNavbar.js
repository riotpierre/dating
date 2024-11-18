import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNavbar.css';
import MatchBar from '../../assets/BottomNavBar/MatchBar.svg'
import MatchBardark from '../../assets/BottomNavBar/HomeLightt.svg'
import ViewMatch from '../../assets/BottomNavBar/ViewMatch.svg'
import ViewMatchLight from '../../assets/BottomNavBar/ViewMatchLight.svg'
import MessageLight from '../../assets/BottomNavBar/MessageLight.svg'
import Message from '../../assets/BottomNavBar/MessageActive.svg'
import Dating from '../../assets/BottomNavBar/DateProfile.svg'
import DatingWhite from '../../assets/BottomNavBar/DatingWhite.svg'



const BottomNavbar = () => {
  return (
    <div className="bottomNavbar">

      <NavLink to="/" className="navLink" activeClassName="active">
        <img style={{width: 40,}} src={MatchBardark} alt="Match" className="icon inactive" />
        <img style={{width: 40,}} src={MatchBar} alt="Match" className="icon active" />
      </NavLink>
      <NavLink to="/match" className="navLink" activeClassName="active">
        <img style={{width: 40,}} src={ViewMatchLight} alt="Explore" className="icon inactive" />
        <img style={{width: 40,}} src={ViewMatch} alt="Explore" className="icon active" />
      </NavLink>
      <NavLink to="/profile" className="navLink" activeClassName="active">
        <img style={{width: 40,}} src={Dating} alt="Profile" className="icon inactive" />
        <img style={{width: 40,}} src={DatingWhite} alt="Profile" className="icon active" />
      </NavLink>
      <NavLink to="/chats" className="navLink" activeClassName="active">
        <img style={{width: 40,}} src={MessageLight} alt="Messages" className="icon inactive" />
        <img style={{width: 40,}} src={Message} alt="Messages" className="icon active" />
      </NavLink>
    </div>
  );
};

export default BottomNavbar;
