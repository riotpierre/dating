import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import Verify from "../../assets/verified.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import BackArrow from "../../assets/goBackarrow.svg";
import "./AdminReview.css";

const AdminReview = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userDoc.exists() && userDoc.data().role !== "admin") {
        navigate("/");
      }
    };

    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "users"), where("status", "==", "pending"));
        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    checkAdmin();
    fetchUsers();
  }, [navigate]);

  const handleApprove = async (userId) => {
    try {
      await updateDoc(doc(db, "users", userId), { status: "approved" });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleReject = async (userId) => {
    try {
      await updateDoc(doc(db, "users", userId), { status: "rejected" });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  const generateCSV = () => {
    const headers = "First Name,Email\n";
    const rows = users
      .map(user => `${user.firstName},${user.email}`)
      .join("\n");

    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "user_emails.csv");
  };

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
          Admin Review Page <img style={{ width: 15 }} src={Verify} alt="" />
        </p>
        <button onClick={() => navigate("/help")}>
          <img src={ChatAssistance} alt="back button" />
        </button>
      </div>
      {users.length === 0 ? (
        <p>No pending users</p>
      ) : (
        <div className="ulReview">
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <p>Email: {user.email}</p>
                <p>Status: {user.status}</p>
                <button  onClick={() => handleApprove(user.id)}>Approve</button>
                <button className="reject" onClick={() => handleReject(user.id)}>Reject</button>
              </li>
            ))}
          </ul>
          <button className="odelee" onClick={generateCSV}>Download CSV</button>
        </div>
      )}
    </div>
  );
};

export default AdminReview;
