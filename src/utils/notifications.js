import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const addStatusNotification = async (status) => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const userIds = usersSnapshot.docs.map(doc => doc.id);
    const userAvatar = status.profilePicture || "https://firebasestorage.googleapis.com/v0/b/ikorodu-dating-site.appspot.com/o/profilePictures%2FzQpZfgJcRhaASakiBUJfwxVqhvt2?alt=media&token=2b4d62d2-c063-4299-a097-790a7da1ad3c"; // Include the avatar in status
    const userStatusPics = status.statusPicture || "https://firebasestorage.googleapis.com/v0/b/ikorodu-dating-site.appspot.com/o/profilePictures%2FzQpZfgJcRhaASakiBUJfwxVqhvt2?alt=media&token=2b4d62d2-c063-4299-a097-790a7da1ad3c"; // Include the avatar in status

    for (const userId of userIds) {
      await addDoc(collection(db, 'notifications'), {
        userId,
        type: 'status',
        message: `${status.username} added a new status.`,
        timestamp: new Date(),
        seen: false,
        avatar: userAvatar,
        statusPICS: userStatusPics,
      });
    }
  } catch (error) {
    console.error('Error adding notification:', error);
  }
};
