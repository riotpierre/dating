// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you 


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingScreen1 from './OnboardingScreen1';
import OnboardingScreen2 from './OnboardingScreen2';
import OnboardingScreen3 from './OnboardingScreen3';
import './OnboardingStyle.css'
import './DesktopOnboardingStyle.css'

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const finishOnboarding = () => {
    navigate('/signup');
  };

  return (
    <div className="onboarding">
      {step === 1 && <OnboardingScreen1 nextStep={nextStep} />}
      {step === 2 && <OnboardingScreen2 nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <OnboardingScreen3 prevStep={prevStep} finishOnboarding={finishOnboarding} />}
    </div>
  );
};

export default Onboarding;
