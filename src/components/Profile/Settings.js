import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import BackArrow from "../../assets/goBackarrow.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";


const Settings = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    status: '',
    age: '',
    gender: '',
    interests: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setError('No user data found.');
          }
        } else {
          setError('No authenticated user found.');
        }
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, userData);
        setSuccess('Profile updated successfully!');
      } else {
        setError('No authenticated user found.');
      }
    } catch (error) {
      setError('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
            <div style={{ paddingTop: 16, backgroundColor: "#ffffff25", position: 'fixed', backdropFilter: 'blur(12px)' }} className="onboardingBackBTN">
        <button onClick={() => navigate(-1)}>
          <img src={BackArrow} alt="back button" />
        </button>
        <p style={{ fontSize: 18, fontWeight: "600", color: "#e91e63" }}>
          Settings Page
        </p>
        <button onClick={() => navigate("/settings")}>
        <img src={ChatAssistance} alt="back button" />
          
        </button>
      </div>
      <div style={{width: '90%'}} className="boldernamee">Welcome to Settings Page </div>
      <div style={{width: '87%'}} className="boldernameesmall">Here you can edit your account and make it look best as you want</div>
      {loading ? (
        <p>Loading user data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form className="settings-form" onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled
          />
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={userData.location}
            onChange={handleChange}
          />
          <label>Status</label>
          <input
            type="text"
            name="status"
            value={userData.status}
            onChange={handleChange}
          />
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={userData.age}
            onChange={handleChange}
          />
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
          />
          <label>Interests</label>
          <input
            type="text"
            name="interests"
            value={userData.interests}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
          {success && <p className="success-message">{success}</p>}
        </form>
      )}
    </div>
  );
};

export default Settings;
