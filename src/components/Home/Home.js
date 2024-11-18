import React, { useState, useEffect, useRef, useCallback } from "react";
import TinderCard from "react-tinder-card";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import "./HomePage.css";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import HeartMatch from "../../assets/BottomNavBar/HeartKitt.svg";
import Dislikee from "../../assets/BottomNavBar/cancelLike.svg";
import LikeDate from "../../assets/BottomNavBar/LikeDate.svg";
import { useNavigate } from "react-router-dom";
import StarBtn from "../../assets/UserdetailsIcons/StarBtn.svg";
import LocaIcon from "../../assets/UserdetailsIcons/LocaIcon.svg";
import LoveLike from "../../assets/UserdetailsIcons/Lovelike.svg";
import DislikeBTN from "../../assets/UserdetailsIcons/DislikeBTN.svg";
import Notifii from "../../assets/Notifififif.svg";
import NameIcon from "../../assets/UserIcono.svg";
import Smenu from "../../assets/OnboardingCards/SMenuu.svg";
import IkoroduLogo from "../../assets/OnboardingCards/Ikorodu-Dating-Logo.svg";
import StatusBar from "../StatusBar/StatusBar";
import Loader from "../Loader/Loader";
import { orderBy } from "firebase/firestore";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(7);
  const currentIndexRef = useRef(currentIndex);
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState([]);
  const [leftBar, setLeftBar] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchStatusesAndUsers = async () => {
      try {
        const statusesCollection = collection(db, "statuses");
        const statusesSnapshot = await getDocs(statusesCollection);
        const statusesList = await Promise.all(
          statusesSnapshot.docs.map(async (statusDoc) => {
            const statusData = statusDoc.data();
            const userDoc = await getDoc(doc(db, "users", statusData.uid));
            const userData = userDoc.exists() ? userDoc.data() : {};
            return {
              id: statusDoc.id,
              ...statusData,
              profilePicture: userData.profilePicture || "",
            };
          })
        );

        setStatuses(statusesList);
      } catch (error) {
        // Handle error
      }
    };

    fetchStatusesAndUsers();
  }, []);

  useEffect(() => {
    const checkUserStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            if (data.status === "approved") {
              fetchUsers();
            } else {
              navigate("/verification");
            }
          } else {
            setError("No user data found.");
            navigate("/login");
          }
        } catch (error) {
          setError("Error fetching user data.");
          return <Loader />;
        }
      } else {
        navigate("/login");
      }
    };

    checkUserStatus();
  }, [navigate]);

  const fetchUsers = useCallback(async () => {
    try {
      // Fetch users and order them by creation date
      const querySnapshot = await getDocs(
        collection(db, "users"),
        orderBy("createdAt", "desc")  // Sort users by creation date, newest first
      );
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
      setCurrentIndex(usersList.length - 1);
      currentIndexRef.current = usersList.length - 1;
    } catch (error) {
      setError("Error fetching users.");
    } finally {
      setLoading(false);
    }
  }, []);
  

  const closeLeftModal = () => {
    setLeftBar(false);
  };

  const swiped = useCallback(
    async (direction, user, index) => {
      setCurrentIndex(index - 1);
      currentIndexRef.current = index - 1;

      const currentUser = auth.currentUser;
      if (currentUser) {
        const currentUserId = currentUser.uid;
        const swipedUserId = user.id;

        try {
          const currentUserDisplayName =
            currentUser.displayName || "Unknown User";
          const currentUserPhotoURL =
            currentUser.photoURL || "default-user-image-url";
          const [firstName = "Unknown", lastName = "User"] =
            currentUserDisplayName.split(" ");

          if (direction === "right") {
            // Like
            await setDoc(
              doc(db, "users", currentUserId, "likes", swipedUserId),
              user
            );
            // Add like notification
            await addDoc(collection(db, "notifications"), {
              userId: swipedUserId,
              type: "like",
              message: `${firstName} liked you`,
              timestamp: new Date(),
              seen: false,
              avatar: currentUserPhotoURL,
            });
          } else if (direction === "left") {
            // Dislike
            await setDoc(
              doc(db, "users", currentUserId, "dislikes", swipedUserId),
              user
            );
          } else if (direction === "up") {
            // Match (assuming mutual like)
            await setDoc(
              doc(db, "users", currentUserId, "matches", swipedUserId),
              user
            );
            await setDoc(
              doc(db, "users", swipedUserId, "matches", currentUserId),
              {
                id: currentUserId,
                firstName,
                lastName,
                location: currentUser.location || "Unknown Location",
                photoURL: currentUserPhotoURL,
              }
            );
            // Add match notification for both users
            await addDoc(collection(db, "notifications"), {
              userId: swipedUserId,
              type: "match",
              message: `You matched with ${firstName}`,
              timestamp: new Date(),
              seen: false,
              avatar: currentUserPhotoURL,
            });
            await addDoc(collection(db, "notifications"), {
              userId: currentUserId,
              type: "match",
              message: `${user.firstName} matched with you, wow!`,
              timestamp: new Date(),
              seen: false,
              avatar: user.profilePicture || "default-user-image-url",
            });
          }
        } catch (error) {
          // Handle error
        }
      }
    },
    []
  );

  const outOfFrame = (name) => {};

  const childRefs = useRef([]);

  const handleSwipe = (dir) => {
    if (currentIndexRef.current >= 0) {
      childRefs.current[currentIndexRef.current]?.swipe(dir);
    }
  };

  const handleCardClick = (user) => {
    navigate("/user-details", { state: { user } });
  };

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 7);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="loadingHome">{error}</div>;
  }

  return (
    <div className="homePage">
      <div className="topMatch">
        <div className="innerTopMatch">
          <div className="locationIcon">
            <img style={{ width: 26 }} src={LocaIcon} alt="lover match" />
          </div>
          <div>
            <div className="strong">Location</div>
            <div className="blockk">{userData?.location}</div>
          </div>
        </div>
        <div className="homeTopMenu">
          <div onClick={() => setLeftBar(true)} className="notificationn">
            <img style={{ width: 26 }} src={Smenu} alt="lover match" />
          </div>
          <div
            onClick={() => navigate("/notifications")}
            className="notificationn"
          >
            <img style={{ width: 26 }} src={Notifii} alt="lover match" />
          </div>
        </div>
      </div>
      <StatusBar initialStatuses={statuses} />
      <div className="divide"></div>
      <div onClick={handleViewMore} className="cardContainer">
        {users.slice(0, visibleCount).map((user, index) => (
          <TinderCard
            onClick={() => handleCardClick(user)}
            ref={(el) => (childRefs.current[index] = el)}
            className="swipe"
            key={user.id}
            onSwipe={(dir) => swiped(dir, user, index)}
            onCardLeftScreen={() => outOfFrame(user.firstName)}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{
                backgroundImage: `url(${
                  user.profilePicture || "default-user-image-url"
                })`,
              }}
              className="card"
              onClick={() => handleCardClick(user)}
            >
              <div
                onClick={() => handleCardClick(user)}
                className="userInfoHolder"
              >
                <div className="tindercardname">
                  <div className="tindercardnameChild">
                    <h3>
                      {user.firstName} {user.lastName}
                    </h3>
                    <div>
                      {user.location}, {user.age}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCardClick(user)}
                    className="viewDirectuserDetails"
                  >
                    <img
                      style={{ width: 32 }}
                      src={NameIcon}
                      alt="first name icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      {visibleCount < users.length && (
        <div className="viewMoreContainer">
          <button className="viewMoreButton" onClick={handleViewMore}>
            Load More Cuties
          </button>
        </div>
      )}
      <div className="buttons">
        <button onClick={() => handleSwipe("left")} className="dislike buttonty">
          <img src={DislikeBTN} alt="lover match" />
        </button>
        <button onClick={() => handleSwipe("up")} className="match buttonty">
          <img src={LoveLike} alt="lover match" />
        </button>
        <button onClick={() => handleSwipe("right")} className="like buttonty">
          <img className="" src={StarBtn} alt="lover boy" />
        </button>
      </div>
      {leftBar && (
        <div className="leftScreenHolder">
          <div className="leftScreenHolderChild">
            <div className="leftPremiungap" style={{ gap: 60 }}>
              <div className="leftonboardingBackBTN">
                <div className="authTextBox">
                  <img
                    style={{ width: 50 }}
                    src={IkoroduLogo}
                    alt="back button"
                  />
                </div>
                <div></div>
              </div>

              
            <div className="menutextHolder">
             <div className="menutext">
              <div onClick={() => navigate('/likes')} > Your Likes</div>
             </div>
             <div className="menutext">
              <div> Your Dislikes</div>
             </div>
            
            </div>
            </div>
            <div className="leftPremiungap">
              <div className="premiumUserHolder">
                <div className="premiumUserHolderText">
                  <h4>Premium User</h4>
                  <p>
                    loremi khafi jkshfis kjahfliw akhflkw a.dwe ,a.efe weakw
                  </p>
                </div>
                <div className="premiumUserBox">
                  <div className="premiumUser"></div>
                  <div className="premiumUser"></div>
                  <div className="premiumUser"></div>
                  <div className="premiumUser"></div>
                  <div className="premiumUser"></div>
                  <div className="premiumUser"></div>
                </div>
              </div>
              <div
                style={{ background: "transparent", padding: 8 }}
                className="premiumUserHolder"
              >
                <button className="premiumButton">
                  Become a premium user
                </button>
              </div>
            </div>
          </div>
          <div className="leftScreenHolderChildother">
            <button onClick={closeLeftModal} className="nameStatususerr">
              <img style={{ width: 35 }} src={Dislikee} alt="" />
            </button>
          </div>
        </div>
      )}
      <BottomNavbar />
    </div>
  );
};

export default HomePage;
