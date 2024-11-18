// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you

import React, { useState, useEffect, useRef } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCog,
  FaBirthdayCake,
  FaGenderless,
  FaHeart,
  FaInfoCircle,
  FaTrash,
} from "react-icons/fa";
import BackArrow from "../../assets/goBackarrow.svg";
import Loader from "../Loader/Loader";
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

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [aboutMe, setAboutMe] = useState("");
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const additionalFileInputRef = useRef(null);


    const logoutUser = async () => {
      try {
        await auth.signOut();
        navigate("/login"); // Redirect to login page after logout
      } catch (error) {
        console.error("Error logging out: ", error);
      }
    };

   


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setAboutMe(data.aboutMe || "");
            setTitle(data.title || "");
          } else {
            setError("No user data found.");
          }
        } else {
          setError("No authenticated user found.");
        }
      } catch (error) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfilePicClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const user = auth.currentUser;
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        await updateDoc(doc(db, "users", user.uid), {
          profilePicture: downloadURL,
        });
        setUserData((prevData) => ({
          ...prevData,
          profilePicture: downloadURL,
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleAdditionalFileChange = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setUploading(true);
      const user = auth.currentUser;
      const uploadPromises = Array.from(files).map(async (file) => {
        const storageRef = ref(
          storage,
          `additionalPictures/${user.uid}/${file.name}`
        );
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      });

      try {
        const downloadURLs = await Promise.all(uploadPromises);
        await updateDoc(doc(db, "users", user.uid), {
          additionalPictures: arrayUnion(...downloadURLs),
        });
        setUserData((prevData) => ({
          ...prevData,
          additionalPictures: [
            ...(prevData.additionalPictures || []),
            ...downloadURLs,
          ],
        }));
      } catch (error) {
        console.error("Error uploading files:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleDeleteImage = async (imageUrl) => {
    setUploading(true);
    const user = auth.currentUser;
    const storageRef = ref(storage, imageUrl);

    try {
      await deleteObject(storageRef);
      await updateDoc(doc(db, "users", user.uid), {
        additionalPictures: arrayRemove(imageUrl),
      });
      setUserData((prevData) => ({
        ...prevData,
        additionalPictures: prevData.additionalPictures.filter(
          (url) => url !== imageUrl
        ),
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleAboutMeChange = async (e) => {
    const newAboutMe = e.target.value;
    setAboutMe(newAboutMe);
    const user = auth.currentUser;
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), { aboutMe: newAboutMe });
      } catch (error) {
        console.error("Error updating about me:", error);
      }
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleEditTitleClick = () => {
    setEditTitle(true);
  };

  const handleSaveTitle = async () => {
    setEditTitle(false);
    const user = auth.currentUser;
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), { title });
      } catch (error) {
        console.error("Error updating title:", error);
      }
    }
  };
  

  const getIconForInterest = (interest) => {
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
    <div className="profile-container">
      <div style={{ paddingTop: 16, backgroundColor: "#ffffff25", position: 'fixed', backdropFilter: 'blur(12px)' }} className="onboardingBackBTN">
        <button onClick={() => navigate(-1)}>
          <img src={BackArrow} alt="back button" />
        </button>
        <p style={{ fontSize: 18, fontWeight: "600", color: "#e91e63" }}>
          Profile page
        </p>
        <button onClick={() => navigate("/settings")}>
          <FaCog />
        </button>
      </div>
      <div className="profile-header"></div>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : userData ? (
        <div className="profile-details">
          <div className="profile-box">
            <img
              src={userData.profilePicture || "DefaultProfilePic"}
              alt="Profile"
              className="profile-picture"
              onClick={handleProfilePicClick}
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <h3>
              {userData.firstName} {userData.lastName}
            </h3>
            <div className="titleBox">
              <div>{userData.email}</div>
              {editTitle ? (
                <div>
                  <input
                    type="text"
                    value={title}
                    placeholder="Enter your title"
                    onChange={handleTitleChange}
                  />
                  <button onClick={handleSaveTitle}>Save</button>
                </div>
              ) : (
                <div className="titleBoxx">
                  <div>{title}</div>
                  <button onClick={handleEditTitleClick}>Edit</button>
                </div>
              )}
            </div>
          </div>
          <div className="user-infoo">
            <p>
              <FaMapMarkerAlt /> {userData.location}
            </p>
            <p>
              <FaInfoCircle /> Status: {userData.status}
            </p>
            <p>
              <FaBirthdayCake /> Age: {userData.age}
            </p>
            <p>
              <FaGenderless /> Gender: {userData.gender}
            </p>
          </div>

          <div className="user-infoo">
            <div className="boldernamee">Interests </div>
            <div className="boldernameesmall">
              This are the interest you choose when siginh up, we will show it
              to them
            </div>
            {userData.interests && userData.interests.length > 0 ? (
              userData.interests.map((interest, index) => (
                <button key={index} className="interestButtonm">
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

          <div className="user-infoo">
            <div className="boldernamee">About me</div>
            <div className="boldernameesmall">
              Tell the word about you this should long and catchy
            </div>
            <textarea
              value={aboutMe}
              onChange={handleAboutMeChange}
              placeholder="Tell us about yourself..."
              rows="4"
            ></textarea>
            <button className="upload-more-btn">Add about me / Edit</button>
          </div>

          <div className="additional-images">
            <div className="boldernamee">Additional Images:</div>
            <div className="boldernameesmall">
              Images are way of showing ourselves to another make sure you use
              it well
            </div>
            {userData.additionalPictures &&
            userData.additionalPictures.length > 0 ? (
              userData.additionalPictures.map((picture, index) => (
                <div key={index} className="additional-image-container">
                  <img
                    src={picture}
                    alt={`User pic ${index + 1}`}
                    className="additional-picture"
                  />
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteImage(picture)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            ) : (
              <p>No additional pictures available</p>
            )}
          </div>

          <button  className="upload-more-btn" onClick={logoutUser}>Logout</button>

          <button
            className="upload-more-btn"
            onClick={() => additionalFileInputRef.current.click()}
          >
            Upload More Pictures
          </button>
          <input
            type="file"
            multiple
            ref={additionalFileInputRef}
            style={{ display: "none" }}
            onChange={handleAdditionalFileChange}
          />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <BottomNavbar />
    </div>
  );
};

export default Profile;
