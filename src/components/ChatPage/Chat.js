import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  where,
  query,
  setDoc,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import "./Chat.css";
import Sticker from "./StickerrMessage.svg";
import Microphone from "./Mickckc.svg";
import LocaIcon from "../../assets/UserdetailsIcons/LocaIcon.svg";
import Sender from "./Sendessage.svg";
import BackArrow from "../../assets/goBackarrow.svg";
import VeriG from '../../assets/statusverified.svg'
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      setUser(user);
      console.log("Logged in user:", user);
    };
    fetchUser();

    const fetchRecipient = async () => {
      const recipientDoc = await getDoc(doc(db, "users", userId));
      if (recipientDoc.exists()) {
        setRecipient(recipientDoc.data());
        console.log("Recipient:", recipientDoc.data());
      }
    };
    fetchRecipient();
  }, [userId]);

  useEffect(() => {
    if (user) {
      const chatId = [user.uid, userId].sort().join("_");
      console.log("Fetching messages for chatId:", chatId);

      const q = query(
        collection(db, "datingChats", chatId, "messages"),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched messages:", messages);
        setMessages(messages);
        scrollToBottom();
      });

      return () => unsubscribe();
    }
  }, [user, userId]);

  const handleSend = async () => {
    if (newMessage.trim() === "") return;

    const message = {
      senderId: user.uid,
      receiverId: userId,
      message: newMessage,
      timestamp: new Date(),
      unread: true,
    };

    const chatId = [user.uid, userId].sort().join("_");

    const chatData = {
      participants: [user.uid, userId],
      lastMessage: newMessage,
      lastTimestamp: new Date(),
    };

    await Promise.all([
      setDoc(doc(db, "datingChats", chatId), chatData),
      addDoc(collection(db, "datingChats", chatId, "messages"), message),
    ]);

    setNewMessage("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const markMessagesAsRead = async () => {
    const chatId = [user.uid, userId].sort().join("_");
    const messagesQuery = query(
      collection(db, "datingChats", chatId, "messages"),
      where("unread", "==", true),
      where("receiverId", "==", user.uid)
    );

    const messagesSnapshot = await getDocs(messagesQuery);
    const batch = writeBatch(db);

    messagesSnapshot.forEach((doc) => {
      const messageRef = doc.ref;
      batch.update(messageRef, { unread: false });
    });

    await batch.commit();
  };

  useEffect(() => {
    if (user) {
      markMessagesAsRead();
    }
  }, [user, userId]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-container">
      {recipient && (
        <div className="chat-header">
          <div className="nameOlo">
            <button className="thrBackBTN" onClick={() => navigate(-1)}>
              <img src={BackArrow} alt="back button" />
            </button>
            <img
              src={recipient.profilePicture}
              alt={recipient.firstName}
              className="recipient-avatar"
            />
            <div className="chat-header-Name">
              <span className="recipient-name">{recipient.firstName}</span>
            </div>
          </div>

          <div className="innerTopMatch">
            <div className="aliighghg">
              <div className="strong">Location</div>
              <div className="blockk"> {recipient.location} </div>
            </div>
            <div className="locationIcon">
              <img style={{ width: 26 }} src={LocaIcon} alt="lover match" />
            </div>
          </div>
        </div>
      )}
      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.senderId === user.uid ? "sent" : "received"}`}
          >
            <p>{msg.message}</p>
            <div className="timestamp">
            <span className="spann" >{formatTimestamp(msg.timestamp)} 
            <img  style={{width: 13, height: 13}} src={VeriG} alt='verified' /> 
            </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="send-message">
        <div className="input-box-message">
          <img style={{ width: 25 }} src={Sticker} alt="" />
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <img style={{ width: 25 }} src={Microphone} alt="" />
        </div>
        <button onClick={handleSend}>
          <img style={{ width: 25 }} src={Sender} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
