import React, { useState, useRef } from 'react';
import { storage, auth, db } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import BackArrow from "../../assets/goBackarrow.svg";
import PasswordIcon from "../../assets/passwordIcon.svg";
import ProfileIconn from "../../assets/OnboardingCards/profileIconnn.svg";
import CardThree from "../../assets/OnboardingCards/Cardtree.svg";
import ChatAssistance from '../../assets/OnboardingCards/HelpLoverr.svg'
import CameraLook from '../../assets/OnboardingCards/Camera-look.svg'
import './ProfilePictureSetup.css';
import '../OnboardingScreen/OnboardingStyle.css'

const ProfilePictureSetup = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image");
      return;
    }

    setLoading(true);
    const user = auth.currentUser;
    const storageRef = ref(storage, `profilePictures/${user.uid}`);
    try {
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      await updateDoc(doc(db, 'users', user.uid), { profilePicture: imageUrl });
      navigate('/gender-selection'); // Redirect to home or any other page
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="profile-setup-container">
         <div style={{paddingTop: 16}} className="onboardingBackBTN">
        <button onClick={() => navigate(-1)}>
          <img src={BackArrow} alt="back button" />
        </button>
        <p style={{fontSize: 18, fontWeight: '600', color: '#e91e63'}}>Set Up Your Profile Picture</p>
        <button>
        <img src={ChatAssistance} alt="back button" />
        </button>
      </div>
     
    <div className='profileHolder'>

    <div className="profile-picture-preview" onClick={() => fileInputRef.current.click()}>
        {imagePreview ? (
          <img src={imagePreview } alt="Profile Preview" />
        ) : (
          <div className="placeholder">
            <p>Click to upload</p>
            <img className='' style={{width: 64, height: 64 }} src={CameraLook} alt="back button" />
          </div>
        )}

      </div>
      
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <div className='onboardingBottomm' >
      <img style={{width: 60, marginBottom: 7, marginTop: 7,}} src={ProfileIconn} alt="back button" />

        <p style={{textAlign: 'center', color: '#00000050', fontSize: 14, width: '97%'}}>
            * Your uploaded picture will serve as your profile picture that will be use on the dating site, it will be publicly display to the general (*Other users) and your 
            so your loved ones can see you, chat you up and make a forever connection with you
        </p>
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading, wait..." : "Save your pic"}
      </button>
      </div>
      {error && <p>{error}</p>}
    </div>
    </div>
  );
};

export default ProfilePictureSetup;
