// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you 


import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './VerificationConfirmation.css';
import Donee from '../../assets/Check-duotone.svg';
import BackArrow from '../../assets/goBackarrow.svg';
import ChatAssistance from '../../assets/OnboardingCards/HelpLoverr.svg';
import IkoroduLogo from '../../assets/OnboardingCards/Ikorodu-Dating-Logo.svg';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

import VeriG from '../../assets/statusverifiedWhite.svg'
import Dislikee from "../../assets/BottomNavBar/cancelLike.svg";

const VerificationConfirmation = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [userPay, setuserpay] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setStatus(data.status || 'Pending');
            setEmail(user.email || 'No email found');
            setUsername(user.firstName || 'No email found');
          } else {
            setError('No user data found.');
          }
        } catch (error) {
          setError('Error fetching user data.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No user signed in.');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (status === 'approved') {
      alert("You have beeen approved, welcome to Ikorodu Dating Site");
      navigate('/home');
    }
  }, [status, navigate]);

  
  

  return (
    <div className="confirmation-container">
      <div style={{ paddingTop: 11 }} className="onboardingBackBTN">
        <button onClick={() => navigate(-1)}>
          <img src={BackArrow} alt="back button" />
        </button>
        <p style={{ fontSize: 18, fontWeight: '600', color: '#e91e63' }}></p>
        <button onClick={() => navigate('/help')} >
          <img src={ChatAssistance} alt="Chat Assistance" />
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="confirmation-content">
          <img style={{ width: 100 }} src={Donee} alt="Done Submitting" />
          <h2>Verification Submitted</h2>
          <p>Your verification request has been received, Make sure you've make your payment and Please wait for approval.</p>
        </div>
      )}

    {userPay && (
        <div className='userPayModal'>
             <div className='userstatusHeadertextt'>
       
        <div>
        <div className='nameStatususerrr'>
          secured web

            <img  style={{width: 13, height: 13}} src={VeriG} alt='verified' />
        </div>


        </div>

        <div onClick={() => setuserpay(false)} className='nameStatususerrr'>
        <img onClick={() => setuserpay(false)} style={{width: 35}} src={Dislikee} />
        Close
        </div>

        </div>
          <div className='userPayModalChild'>
            <img style={{ width: 90, margin: '5%', }}  src={IkoroduLogo} alt='Ikorodu Logo' />
            <div className='userpayHolder'>
            <div className='boldernameUserPay'>Thank you for signing up </div>
            <div className='lightnameuserpay'>We request you to pay N500 for verification just to limit the access of user that are not truly searching for love on our platform </div>
            </div>
<button onClick={() => navigate('/verification')} className='userPayModalChildButton'>
Okay i will pay to Verify
</button>
<div onClick={() => setuserpay(false)} style={{margin: 10}} className='lightnameuserpay'>
  I have pay already
</div>
          </div>
        </div>
    )}
      <div className="user-info">
        <div>Account status: <span>{status}</span></div>
        <div>Email: <span>{email}</span></div>
      </div>
    </div>
  );
};


export default VerificationConfirmation;
