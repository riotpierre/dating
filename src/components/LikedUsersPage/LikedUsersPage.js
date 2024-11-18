// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you 


import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/goBackarrow.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import LoveLogo from "../../assets/3D-Instagram-like-icon-on-transparent-background-PNG.png";
import CloseSmall from "../../assets/CloseSmall.svg";
import LikeSmall from "../../assets/ThisLike.svg";

const LikedUsersPage = () => {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      const user = auth.currentUser;
      if (user) {
        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "matches")
        );
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMatchedUsers(usersList);
      }
    };

    fetchMatchedUsers();
  }, []);

  const handleDelete = async (userId) => {
    const user = auth.currentUser;
    if (user) {
      await deleteDoc(doc(db, "users", user.uid, "matches", userId));
      setMatchedUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  const handleMessage = (userId) => {
    navigate(`/chat/${userId}`);
  };

  const handleUserClick = (user) => {
    navigate("/user-details", { state: { user } });
  };

  return (
    <div className="LikedUsersPage">
      <div style={{ paddingTop: 16 }} className="onboardingBackBTN">
        <button onClick={() => navigate(-1)}>
          <img src={BackArrow} alt="back button" />
        </button>
        <p style={{ fontSize: 18, fontWeight: "600", color: "#e91e63" }}>
          Your Likes
        </p>
        <button onClick={() => navigate("/help")}>
          <img src={ChatAssistance} alt="back button" />
        </button>
      </div>
      <div className="matchesText">
        <div>
          <div className="matchText">Those you Liked</div>
          <div>Those you Like are here as your Likee</div>
        </div>
        <img style={{ width: 60 }} src={LoveLogo} alt="" />
      </div>
      <div className="usersList">
        <div className="drawer"></div>

        {matchedUsers.map((user) => (
          <div key={user.id} className="userCard">
            <img
              src={user.profilePicture || "default-user-image-url"}
              alt={`${user.firstName} ${user.lastName}`}
              onClick={() => handleUserClick(user)}
              className="clickableUserImage"
            />
            <div className="userInfo">
              <div className="userNameMatch">
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
                <div>
                  {user.location}, {user.age}{" "}
                </div>
              </div>

              <div className="userActions">
                <button
                  className="messageButton"
                  onClick={() => handleMessage(user.id)}
                >
                  <img
                    style={{ width: 37, height: 37 }}
                    src={LikeSmall}
                    alt="back button"
                  />
                </button>
                <button
                  className="deleteButton"
                  onClick={() => handleDelete(user.id)}
                >
                  <img
                    style={{ width: 37, height: 37 }}
                    src={CloseSmall}
                    alt="back button"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}

        {matchedUsers.length === 0 && (
          <div className="userCardNo">No Matches yet</div>
        )}
      </div>
      <BottomNavbar />
    </div>
  );
};

export default LikedUsersPage;
