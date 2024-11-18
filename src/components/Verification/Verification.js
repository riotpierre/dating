// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you 


import React, { useState, useRef, useEffect } from "react";
import { storage, db, auth } from "../../firebase"; // Make sure you import auth
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "./Verification.css";
import BackArrow from "../../assets/goBackarrow.svg";
import UserOne from "../../assets/OnboardingCards/IMG_7252.JPG";
import UserTwo from "../../assets/OnboardingCards/IMG_7250.JPG";
import UserThree from "../../assets/OnboardingCards/IMG_7255.JPG";
import Verify from "../../assets/verified.svg";
import BankI from "../../assets/OnboardingCards/bxs-bank.675dee3990c1a772a4dd5872a9005f31.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";

const Verification = () => {
  const [photo, setPhoto] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [idCardPreview, setIdCardPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const photoInputRef = useRef(null);
  const idCardInputRef = useRef(null);

  useEffect(() => {
    // Get current user data
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Handle user not logged in
        navigate("/login"); // Redirect to login if user is not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleIdCardChange = (e) => {
    const file = e.target.files[0];
    setIdCard(file);
    if (file) {
      setIdCardPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photo && idCard && user) {
      setLoading(true); // Set loading to true when submit starts
      try {
        const photoRef = ref(storage, `photos/${photo.name}`);
        const idCardRef = ref(storage, `idCards/${idCard.name}`);
        await uploadBytes(photoRef, photo);
        await uploadBytes(idCardRef, idCard);

        const photoURL = await getDownloadURL(photoRef);
        const idCardURL = await getDownloadURL(idCardRef);

        await addDoc(collection(db, "verifications"), {
          photoURL: photoURL,
          idCardURL: idCardURL,
          status: "pending",
          email: user.email,
        });

        navigate("/verification-confirmation"); // Redirect to confirmation page
      } catch (error) {
        setMessage("Error submitting verification.");
      } finally {
        setLoading(false); // Set loading to false when submit finishes
      }
    }
  };

  return (
    <div className="verification">
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
          Verification <img style={{ width: 15 }} src={Verify} alt="" />
        </p>
        <button onClick={() => navigate("/help")}>
          <img src={ChatAssistance} alt="back button" />
        </button>
      </div>

      <div className="signUpTop">
        <div className="signUpTopHH">
          <h2>₦500 - Verification</h2>
          <p style={{ fontSize: 10, color: "#00000080" }}>
            *We don't want crowd... we want only interested mind, to enjoy our
            platform we require you to pay a one time Registration Fees of 500
            to Become a Member
          </p>
        </div>
      </div>

      <form className="verification-form" onSubmit={handleSubmit}>
        <div className="proofImages">
          <div
            className="file-input-container"
            onClick={() => photoInputRef.current.click()}
          >
            {photoPreview ? (
              <div className="image-preview">
                <img src={photoPreview} alt="Preview" />
              </div>
            ) : (
              <div className="image-placeholder">
                <p>Click to upload photo</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              ref={photoInputRef}
              style={{ display: "none" }}
              required
            />
          </div>

          <div
            className="file-input-container"
            onClick={() => idCardInputRef.current.click()}
          >
            {idCardPreview ? (
              <div className="image-preview">
                <img src={idCardPreview} alt="ID Card Preview" />
              </div>
            ) : (
              <div className="image-placeholder">
                <p>Click to upload proof of Payment here</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleIdCardChange}
              ref={idCardInputRef}
              style={{ display: "none" }}
              required
            />
          </div>
        </div>

        <div className="onboardingBottomm">
          <div className="bankHolder">
            <div className="BankInfo">
              <div className="bankIcon">
                <img style={{ width: 30 }} src={BankI} alt="ID Card Preview" />
              </div>

              <div className="boldBankHolder">
                <div className="boldBank">Pay with Bank transfer</div>
                <div className="fairBank">Use the account number to pay</div>
              </div>
            </div>

            <div className="banknameHolder">
              <div className="bankDesign">
                <div className="fadeLetter">
                  Zenith Bank
                  <img style={{ width: 13 }} src={Verify} alt="" />
                </div>
                <div className="bankNumber">2191567045</div>
              </div>

              <div className="bankDesignn">
                <div className="fadeLetter">Account name</div>
                <div>Adeoye Enoch Olamilekan</div>
              </div>
            </div>
          </div>

          <button
            disabled={!photo || !idCard}
            type="submit"
            className="submit-buttonn"
          >
            {loading ? (
              <div className="loaderr"></div>
            ) : (
              "Submit for Verification"
            )}
          </button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Verification;
