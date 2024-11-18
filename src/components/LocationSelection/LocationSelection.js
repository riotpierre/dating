import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./Location-Selection.css";
import BackArrow from "../../assets/goBackarrow.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import LocationIcon from "../../assets/OnboardingCards/Locationiconn.svg";

const LocationSelection = ({ setLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = auth.currentUser.uid;

  const handleNext = async () => {
    if (selectedLocation.trim()) {
      setLoading(true);
      try {
        await updateDoc(doc(db, "users", userId), {
          location: selectedLocation,
        });
        setLocation(selectedLocation);
        navigate("/sexual-orientation-selection");
      } catch (error) {
        console.error("Error updating user location: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="location-selection-container">
      <div style={{ paddingTop: 10 }} className="onboardingBackBTN">
        <div className="genderLover">
          <button onClick={() => navigate(-1)}>
            <img src={BackArrow} alt="back button" />
          </button>
          <p
            style={{
              paddingTop: 8,
              fontSize: 15,
              fontWeight: "400",
              color: "#e91e6378",
            }}
          >
            Select Location
          </p>
        </div>
        <button>
          <img src={ChatAssistance} alt="chat assistance" />
        </button>
      </div>
      <div className="location-top-container">
        <img src={LocationIcon} alt="location Icon" />
        <h2>Enter Your Location</h2>
        <div>Choose your location to start find people around you</div>
      </div>
      <div className="location-input-container">
        <div className="locationBox">Allow Location Access</div>
        <input
          type="text"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          placeholder="Enter your location manually"
          className="location-input"
        />
      </div>
      <button
        onClick={handleNext}
        disabled={!selectedLocation.trim() || loading}
        className="location-next-button"
      >
        {loading ? <span className="loaderr"></span> : "Continue"}
      </button>
    </div>
  );
};

export default LocationSelection;
