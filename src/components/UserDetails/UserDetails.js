// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you 


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserDetails.css";
import BackArrow from "../../assets/goBackarrow.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import {
  FaHeart,
  FaRegThumbsUp,
  FaStar,
  FaRegComment,
  FaTrash,
} from "react-icons/fa"; 
import {
  IoFootball,
  IoMusicalNotes,
  IoAirplane,
  IoLaptop,
  IoGameController,
} from "react-icons/io5";
import { FaPaintBrush } from "react-icons/fa";
import { MdOutlineCamera } from "react-icons/md";
import { FaShirt } from "react-icons/fa6";
import { PiCookingPotFill, PiHeartHalfDuotone } from "react-icons/pi";
import CameraLook from "../../assets/OnboardingCards/Camera-look.svg";
import LoveLike from "../../assets/UserdetailsIcons/Lovelike.svg";
import DislikeBTN from "../../assets/UserdetailsIcons/DislikeBTN.svg";
import SendAm from "../../assets/UserdetailsIcons/Sendmessage.svg";
import StarBtn from "../../assets/UserdetailsIcons/StarBtn.svg";
import LocaIcon from "../../assets/UserdetailsIcons/LocaIcon.svg";
import Loader from "../Loader/Loader";

const UserDetails = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();

  if (!user) {
    return ( <Loader />

    );
  }

  const getIconForInterest = (interest) => {
    // We are mapping each interest to an icon
    switch (interest) {
      case "Sports":
        return <IoFootball size={25} />;
      case "Photography":
        return <MdOutlineCamera size={25} />;
      case "Travel":
        return <IoAirplane size={25} />;
      case "Technology":
        return <IoLaptop size={25} />;
      case "Music":
        return <IoMusicalNotes size={25} />;
      case "Cooking":
        return <PiCookingPotFill size={25} />;
      case "Art":
        return <FaPaintBrush size={25} />;
      case "Fashion":
        return <FaShirt size={25} />;
      case "Relationships":
        return <PiHeartHalfDuotone size={25} />;
      case "Gaming":
        return <IoGameController size={25} />;
      default:
        return null;
    }
  };

  return (
    <div className="userDetails">
      <div style={{ paddingTop: 16 }} className="onboardingBackBTN">
        <button onClick={() => navigate(-1)}>
          <img src={BackArrow} alt="back button" />
        </button>

        <button>
          <img src={ChatAssistance} alt="assistance" />
        </button>
      </div>

      <div
        style={{
          background: `url(${user.profilePicture})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
        className="userdetailsBox"
      >
        <div className="userDetailsPicture">
          <img
            className="userDetailsPicturee"
            src={user.profilePicture}
            alt="User"
          />
        </div>
        <div className="usernfo">
          <div className="buttonHolder">
            <button className="actionButtonn">
              <img className="" src={DislikeBTN} alt="dislike" />
            </button>
            <button className="actionButtonn">
              <img className="" src={LoveLike} alt="like" />
            </button>
            <button className="actionButtonn">
              <img className="" src={StarBtn} alt="star" />
            </button>
          </div>
          <div className="messageUser">
            <div className="nameDetailsHolder">
              <div className="nameDetails">
                <h2>{user.firstName}</h2>
                <h2>{user.lastName}</h2>
              </div>
              {user.title || "No title yet"}
            </div>
            <button
              onClick={() => navigate(`/chat/${user.id}`)}
              className="sendall"
            >
              <img className="" src={SendAm} alt="send message" />
            </button>
          </div>
          <div className="fancyLocation">
            <div className="locationDetailsf">
              <div className="boldername">Location</div>
              {user.location}
            </div>
            <div className="locationandageicon">
              <p style={{ width: 60, backgroundColor: "#e91e6307" }}>
                <img style={{ width: 25 }} src={LocaIcon} alt="location icon" />
              </p>
              <p>
                age: <span style={{ fontSize: 30 }}>{user.age}</span>{" "}
              </p>
            </div>
          </div>
          <p>{user.gender}</p>

          <div className="aboutUser">
            <div className="boldernamee">About</div>
            <div className="aboutsection">
              {user.aboutMe || "This user hasn't written about themselves yet."}
            </div>
          </div>

          <div className="interestButtons">
            <div className="boldernamee">Interests</div>
            <div className="boldernameesmall">
              These are the interests you chose when signing up, we will show it
              to others.
            </div>
            {user.interests && user.interests.length > 0 ? (
              user.interests.map((interest, index) => (
                <button key={index} className="interestButton">
                  {getIconForInterest(interest) && (
                    <span className="interestIcon">
                      {getIconForInterest(interest)}
                    </span>
                  )}
                  {interest}
                </button>
              ))
            ) : (
              <p>No interests available</p>
            )}
          </div>

          <div className="userImages">
            <div className="boldernamee">User Gallery</div>
            <div className="boldernameesmall">
              Pictures are a way of showing who we are. This user has uploaded
              these additional pictures.
            </div>
            <div className="userdetailsEmailHolder">
              {user.additionalPictures && user.additionalPictures.length > 0 ? (
                user.additionalPictures.map((picture, index) => (
                  <img
                    key={index}
                    src={picture}
                    alt={`User pic ${index + 1}`}
                    className="additionalPicture"
                  />
                ))
              ) : (
                <div className="boldernameesmall">
                  This user doesn't have additional pictures. Please check back
                  later.
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/profile")}
              className="interestButton"
            >
              Visit your profile to add pictures
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
