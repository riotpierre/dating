// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you

import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import "./NotificationPage.css";
import BackArrow from "../../assets/goBackarrow.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(notificationsList);
    });

    return () => unsubscribe();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await updateDoc(doc(db, "notifications", notificationId), { seen: true });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="notificationPage">
      <div style={{ paddingTop: 16 }} className="onboardingBackBTN">
        <button onClick={() => navigate(-1)}>
          <img src={BackArrow} alt="back button" />
        </button>
        <p style={{ fontSize: 18, fontWeight: "600", color: "#e91e63" }}>
          Notifications
        </p>
        <button onClick={() => navigate("/help")}>
          <img src={ChatAssistance} alt="settings button" />
        </button>
      </div>

      <div className="notificationsList">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notificationItem ${notification.seen ? "seen" : ""}`}
            onClick={() => markAsRead(notification.id)}
          >
            <div>
              <img
                src={notification.avatar}
                alt="avatar"
                className="notification-avatar"
              />
              <div className="notification-content">
                <div className="statusnamee">{notification.message}</div>
                <span>
                  {new Date(
                    notification.timestamp.seconds * 1000
                  ).toLocaleString()}
                </span>
              </div>
            </div>
            {notification.type === "status" && notification.statusPICS && (
              <div className="statusPrevieww">
                <img
                  src={notification.statusPICS}
                  alt="status preview"
                  className="statusPrevieww"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
