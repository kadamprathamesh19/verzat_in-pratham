import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import "aos/dist/aos.css";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import SplashLoader from './components/SplashLoader';
import Footer from './components/Footer';
import SocialBar from './components/SocialBar';
import Home from './pages/Home';
import AIChatButton from './components/ChatBot';
// import AIModel from './components/AIModel';
import AIModelTwo from './components/AIModelTwo';

// Import both providers
import { HeroContentProvider } from './context/HeroContentContext';
import { MissionVisionProvider } from './context/MissionVisionContext';
import { BaseCompanyProvider } from './context/BaseCompanyContext';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Splash Screen Loader */}
      {!isLoaded && <SplashLoader onComplete={() => setIsLoaded(true)} />}

      {/* Main App */}
      {isLoaded && (
        <HeroContentProvider>
          <MissionVisionProvider>
            <BaseCompanyProvider>

              <SocialBar />
              {/* <AIChatButton /> */}
              {/* <AIModel /> */}
              <AIModelTwo />

              <Routes>
                <Route path="/" element={<Home />} />
                {/* Add more routes here */}
              </Routes>

              <Footer />

            </BaseCompanyProvider>
          </MissionVisionProvider>
        </HeroContentProvider>
      )}
    </>
  );
};

export default App;
