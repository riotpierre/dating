import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Onboarding from "./components/OnboardingScreen/Onboarding";
import Signup from "./components/SignUp/Signup";
import Login from "./components/Login/Login";
import Verification from "./components/Verification/Verification";
import AwaitingApproval from "./components/AwaitingApproval/AwaitingApproval";
import AdminReview from "./components/AdminReview/AdminReview";
import RequireAdmin from "./components/AdminReview/RequireAdmin";
import "./App.css";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import ProfilePictureSetup from "./components/ProfilePictureSetup/ProfilePictureSetup";
import VerificationConfirmation from "./components/Verification/VerificationConfirmation";
import "./index.css";
import GenderSelection from "./components/GenderSelection/GenderSelection";
import LocationSelection from "./components/LocationSelection/LocationSelection";
import SexualOrientationSelection from "./components/SexualOrientationSelection/SexualOrientationSelection";
import BirthdateSelection from "./components/BirthdateSelection/BirthdateSelection";
import Home from "./components/Home/Home";
import Match from "./components/Match/Match";
import Explore from "./components/Explore/Explore";
import Profile from "./components/Profile/Profile";

import UserDetails from "./components/UserDetails/UserDetails";
import Settings from "./components/Profile/Settings";
import Loader from "./components/Loader/Loader";
import NotificationPage from "./components/NotificationPage/NotificationPage";
import HelpPage from "./components/Pages/HelpPage";
import WhatsAppPage from "./components/Pages/WhatsAppPage";
import Chat from "./components/ChatPage/Chat";
import ChatsList from "./components/ChatPage/ChatsList";
import ChatList from "./components/ChatPage/ChatsList";
import LikedUsersPage from "./components/LikedUsersPage/LikedUsersPage";
import UserEmailsPage from "./components/EmailUser/UserEmailsPage";

function App() {
  const [gender, setGender] = useState(null);
  const [location, setLocation] = useState(null);
  const [sexType, setSexType] = useState(null);
  const [birthdate, setBirthdate] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(
    localStorage.getItem("verification") === "true"
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Onboarding />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/loading" element={<Loader />} />

        <Route path="/verification" element={<Verification />} />
        <Route path="/mails" element={<UserEmailsPage />} />
        <Route
          path="/gender-selection"
          element={<GenderSelection setGender={setGender} />}
        />
        {/* < path="/emails" element={<UserEmailsPage />} /> */}
        <Route
          path="/location-selection"
          element={<LocationSelection setLocation={setLocation} />}
        />
        <Route
          path="/sexual-orientation-selection"
          element={<SexualOrientationSelection setSexType={setSexType} />}
        />

        

        <Route
          path="/likes"
          element={<LikedUsersPage setSexType={setSexType} />}
        />

        <Route
          path="/birthdate-selection"
          element={<BirthdateSelection setBirthdate={setBirthdate} />}
        />
        <Route path="/awaiting-approval" element={<AwaitingApproval />} />
        <Route
          path="/profile-picture-setup"
          element={<ProfilePictureSetup />}
        />
        <Route
          path="/verification-confirmation"
          element={<VerificationConfirmation />}
        />

        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/gender-selection" element={<GenderSelection />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/match" element={<Match />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat/:userId" element={<Chat />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/chats" element={<ChatList />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/whatsapp" element={<WhatsAppPage />} />
        <Route
          path="/admin-review"
          element={
            <RequireAdmin>
              <AdminReview />
            </RequireAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
