


import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import TextPost from './component/textpost/textpost';
import AddPost from './component/AddPost';
import LoginAdmin from './component/LoginAdmin/login';
import PrivacyPolicy from './component/privacypolicy/privacypolicy';
import TermsAndCondition from './component/termsAndcondition/termsAndcondition';
import AboutUs from './component/Aboutus/aboutus';
import VideoPost from './component/videopost';
import Donation from './component/Donation/donation';
import Requestz from './component/Request/request';
import './App.css'; // Import your CSS file for styling

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <>
      <div>
        {!isLoggedIn ? (
          <LoginAdmin onLogin={handleLogin} />
        ) : (
          <div style={{ display: 'flex' }}>
            <div style={{ width: '15%' }}>
              <Sidebar onLogout={handleLogout} />
            </div>
            <div style={{ width: '75%', margin: '5% 0', textAlign: 'center' }}>
              <div className="dashboard-heading">
                <h1>ADMIN DASHBOARD</h1>
              </div>
              <Routes>
                <Route path="/textpost" element={<TextPost />} />
                <Route path="/imagepost" element={<AddPost />} />
                <Route path="/videopost" element={<VideoPost />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/termsandcondition" element={<TermsAndCondition />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/donation" element={<Donation />} />
                <Route path="/request" element={<Requestz />} />
                {/* Add more routes for other pages */}

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

