import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the import according to your project structure
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { auth } from "../../firebase";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import BackArrow from "../../assets/goBackarrow.svg";
import Verify from "../../assets/verified.svg";
import './email.css'
import { query, where } from "firebase/firestore";

const UserEmailsPage = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const checkAdmin = async () => {
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userDoc.exists() && userDoc.data().role !== "admin") {
        navigate("/");
      }
    };
    checkAdmin();

    

    
  }, [navigate]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const emailList = querySnapshot.docs.map((doc) => doc.data().email);
        setEmails(emailList);
      } catch (error) {
        setError("Error fetching user emails.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-review">
       <div style={{ paddingTop: 16 }} className="onboardingBackBTN">
        <button onClick={() => navigate(-1)}>
          <img src={BackArrow} alt="back button" />
        </button>
        <p
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#e91e63",
            alignItems: "center",
            display: "flex",
            gap: 6,
          }}
        >
          Users Email <img style={{ width: 15 }} src={Verify} alt="" />
        </p>
        <button onClick={() => navigate("/help")}>
          <img src={ChatAssistance} alt="back button" />
        </button>
      </div>
      <p style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#e91e63",
            alignItems: "center",
            display: "flex",
            gap: 6,
            width: '95%'
          }}
          
          >{emails.join(", ")}</p>
    </div>
  );
};

export default UserEmailsPage;
