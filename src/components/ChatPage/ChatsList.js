import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import "./ChatList.css";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import BackArrow from "../../assets/goBackarrow.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import verifMessage from "../../assets/verifiedMessage.svg";
import Passwordiconn from "../../assets/passwordIcon.svg";

const ChatList = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatUsers = async () => {
      const user = auth.currentUser;
      if (user) {
        const userChatsQuery = query(
          collection(db, "datingChats"),
          where("participants", "array-contains", user.uid)
        );
        const userChatsSnapshot = await getDocs(userChatsQuery);

        const chatPreviews = await Promise.all(
          userChatsSnapshot.docs.map(async (chatDoc) => {
            const chatData = chatDoc.data();
            const otherUserId = chatData.participants.find(
              (uid) => uid !== user.uid
            );

            if (!otherUserId) {
              console.error(`No other user ID found in chat ${chatDoc.id}`);
              return null; // Skip this chat if otherUserId is not found
            }

            // Fetch the last message in the chat
            const lastMessageQuery = query(
              collection(db, "datingChats", chatDoc.id, "messages"),
              orderBy("timestamp", "desc"),
              limit(1)
            );
            const lastMessageSnapshot = await getDocs(lastMessageQuery);
            const lastMessage =
              lastMessageSnapshot.docs[0]?.data().message || "";

            // Check if there are any unread messages
            const unreadQuery = query(
              collection(db, "datingChats", chatDoc.id, "messages"),
              where("unread", "==", true),
              where("receiverId", "==", user.uid)
            );
            const unreadSnapshot = await getDocs(unreadQuery);
            const hasUnreadMessages = !unreadSnapshot.empty;

            // Fetch the other user's details
            const otherUserDoc = await getDoc(doc(db, "users", otherUserId));
            const otherUserData = otherUserDoc.data();

            if (!otherUserData) {
              console.error(`No user data found for user ${otherUserId}`);
              return null; // Skip this user if data is not found
            }

            return {
              id: otherUserId,
              name: `${otherUserData.firstName} ${otherUserData.lastName}`,
              profilePicture: otherUserData.profilePicture,
              lastMessage,
              hasUnreadMessages,
            };
          })
        );

        setChatUsers(chatPreviews.filter(Boolean));
      }
    };

    fetchChatUsers();
  }, []);

  return (
    <>
      <div className="chat-list-container">
        <div
          style={{ paddingTop: 16, backgroundColor: "#ffffff25", position: 'fixed', backdropFilter: 'blur(12px)' }}
          className="onboardingBackBTN"
        >
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
            All Messages
          </p>
          <button onClick={() => navigate("/help")}>
            <img src={ChatAssistance} alt="back button" />
          </button>
        </div>

        <ul className="chatHoldingbox">
          {chatUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => navigate(`/chat/${user.id}`)}
              className={user.hasUnreadMessages ? "unread" : ""}
            >
              <img
                src={user.profilePicture}
                alt={user.name}
                className="user-avatar-chat"
              />
              <div className="chatHoldingboxtext">
                <span>{user.name}</span>
                <p className="last-message">{user.lastMessage}....</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="chatSecurities">
        <img
                src={Passwordiconn}
                alt='verified message'
                style={{width: 11}}
              
              />
        your personal messages are
          <span className="span">end-to-end encrypted</span>
          <img
                src={verifMessage}
                alt='verified message'
                style={{width: 13}}
              
              />
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default ChatList;
