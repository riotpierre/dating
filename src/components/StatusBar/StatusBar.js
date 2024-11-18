// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you 



import React, { useState, useEffect } from "react";
import "./StatusBar.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc, getDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import FullScreenStatus from "./FullScreenStatus";
import { addStatusNotification } from "../../utils/notifications";
import { v4 as uuidv4 } from "uuid";
import { uploadBytesResumable } from "firebase/storage";

const StatusBar = ({ initialStatuses }) => {
  const [statuses, setStatuses] = useState(initialStatuses);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          console.log("Fetched user data:", data); // Log user data
          setUserData(data);
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("No authenticated user found.");
      }
    };

    fetchUserData();
  }, []);

  const handleStatusUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const user = auth.currentUser;
    if (!user) {
      console.error("No authenticated user found.");
      return;
    }

    try {
      const storageRef = ref(storage, `statuses/${user.uid}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);

        },
        (error) => {
          console.error("Error uploading status:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.exists() ? userDoc.data() : {};

          const newStatus = {
            id: uuidv4(),
            uid: user.uid,
            username: userData.firstName || user.displayName || "Unknown User",
            profilePicture: userData.profilePicture || user.photoURL || "",
            statusPicture: downloadURL,
            timestamp: new Date(),
            views: 0,
          };

          await addStatusNotification(newStatus);
          await setDoc(
            doc(collection(db, "statuses"), newStatus.id),
            newStatus
          );

          setStatuses((prevStatuses) => [newStatus, ...prevStatuses]);

          console.log("Status uploaded:", downloadURL);
        }
      );
    } catch (error) {
      console.error("Error uploading status:", error);
    }
  };

  return (
    <div className="statusBar">
      <div className="statusItem">
        <div className="statusUpload">
          <input
            type="file"
            accept="image/*"
            onChange={handleStatusUpload}
            className="statusInput"
          />
          <span className="statusUploadText">+</span>
        </div>
        <div className="statusnameee">Your story</div>
      </div>
      {statuses.map((status) => (
        <div
          key={status.id}
          className="statusItem"
          onClick={() => setSelectedStatus(status)}
        >
          <img
            src={status.statusPicture}
            alt="Status"
            className="statusImage"
          />
          <div className="statusnameee">{status.username}</div>
        </div>
      ))}
      {selectedStatus && (
        <FullScreenStatus
          status={selectedStatus}
          onClose={() => setSelectedStatus(null)}
        />
      )}
    </div>
  );
};

export default StatusBar;
