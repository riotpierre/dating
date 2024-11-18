// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you

import React, { useEffect, useState } from "react";
import "./FullScreenStatus.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import VeriG from "../../assets/statusverified.svg";
import Dislikee from "../../assets/BottomNavBar/cancelLike.svg";

const FullScreenStatus = ({ status, onClose }) => {
  const [profilePicture, setProfilePicture] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastName] = useState("");
  const [userlocation, setLocation] = useState("");

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      const userDoc = await getDoc(doc(db, "users", status.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data in FullScreenStatus:", userData);
        setProfilePicture(userData.profilePicture);
        setUsername(userData.firstName);
        setLastName(userData.lastName);
        setLocation(userData.location);
      }
    };

    fetchUserProfilePicture();
  }, [status.uid]);

  return (
    <div
      style={{
        background: `url(${status.statusPicture})`,
        objectFit: "cover",
        backgroundSize: "cover",
      }}
      className="fullScreenStatus"
    >
      <div className="statusHeader">
        <div className="statusHeadertext">
          <img src={profilePicture} alt="User" className="profilePicture" />
          <div>
            <div className="nameStatus">
              {username} {lastname}
              <img style={{ width: 15 }} src={VeriG} alt="Verified" />
            </div>
            <div className="statusDescription">from: {userlocation}</div>
          </div>
        </div>
        <span className="statusClose" onClick={onClose}>
          <img
            style={{ width: 35, cursor: "pointer" }}
            src={Dislikee}
            alt="Close"
          />
        </span>
      </div>
      <div className="viewDesign">Views {status.views}</div>
    </div>
  );
};

export default FullScreenStatus;
