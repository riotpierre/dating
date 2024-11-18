import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./Selection.css";
import BackArrow from "../../assets/goBackarrow.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";

const AgeSelection = ({ setBirthdate }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100; 
    const yearsArray = Array.from({ length: 101 }, (_, i) => startYear + i);
    setYears(yearsArray);
  }, []);
  const handleNext = async () => {
    setLoading(true); 
    try {
      const currentYear = new Date().getFullYear();
      const age = currentYear - selectedYear;
      setBirthdate(selectedYear); 

      const user = auth.currentUser;
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        age: age,
      });

      navigate("/verification"); 
    } catch (error) {
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="selection-container">
      <div style={{ paddingTop: 10 }} className="onboardingBackBTN">
        <div className="genderLover">
          <button onClick={() => navigate(-1)}>
            <img src={BackArrow} alt="back button" />
          </button>
          <p
            style={{
              paddingTop: 4,
              fontSize: 15,
              fontWeight: "400",
              color: "#e91e6378",
            }}
          >
            What is your Age
          </p>
        </div>
        <button>
          <img src={ChatAssistance} alt="chat assistance" />
        </button>
      </div>

      <div className="scroll-container">
        <div className="wheel-top">
          <h2>Select Your Birth Year</h2>
          <div>Please provide your age in years</div>
        </div>
        <div className="scroll-wheel">
          {years.map((year) => (
            <div
              key={year}
              className={`scroll-item ${
                year === selectedYear ? "selected" : ""
              }`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        disabled={loading}
        className="age-next-button"
      >
        {loading ? <span className="loaderr"></span> : "Continue"}
      </button>
    </div>
  );
};

export default AgeSelection;
