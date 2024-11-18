import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { getDoc, doc } from 'firebase/firestore';

const RequireAdmin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        setIsAdmin(true);
      } else {
        navigate('/');
      }
      setLoading(false);
    };

    if (auth.currentUser) {
      checkAdmin();
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAdmin ? children : null;
};

export default RequireAdmin;
