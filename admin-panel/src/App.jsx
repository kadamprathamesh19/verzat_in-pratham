import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import PrivateRoute from './utils/PrivateRoute';

import { AdminProvider } from './context/AdminContext';
import { UserProvider } from './context/UserContext';
import { HeroContentProvider } from './context/HeroContentContext';
import { ServicesProvider } from './context/ServiceContext';
import { AboutProvider } from './context/AboutContext';
import { MissionVisionProvider } from './context/MissionVisionContext';
import { BaseProvider } from './context/BaseContext';
import { LatestProductProvider } from './context/LatestProductContext';
import { ContactProvider } from './context/ContactContext';
import { ApplicationProvider } from './context/ApplicationContext';

import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UserTable from './components/UserTable';
import MessageTable from './components/MessageTable';
import NewsletterTable from './components/NewsletterTable';
import ChangeHeroContent from './components/ChangeHeroContent';
import ChangeServiceContent from './components/ChangeServiceContent';
import ChangeAboutContent from './components/ChangeAboutContent';
import ChangeMissionVisionContent from './components/ChangeMissionVisionContent';
import ChangeBaseContent from './components/ChangeBaseContent';
import ChangeLatestProduct from './components/ChangeLatestProduct';
import ChangeContact from './components/ChangeContact';
import ApplicationList from './components/ApplicationList';
import ApplicantData from './components/ApplicantData';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <Router>

      <AdminProvider>
        <UserProvider>
          <HeroContentProvider>
            <ServicesProvider>
              <AboutProvider>
                <MissionVisionProvider>
                  <BaseProvider>
                    <LatestProductProvider>
                      <ContactProvider>
                        <ApplicationProvider>

                          <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                          />


                          <Routes>
                            {/* Public route */}
                            <Route path="/admin" element={<AdminLogin />} />

                            {/* Protected routes using PrivateRoute and Layout */}
                            <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                              <Route path="/" element={<Navigate to="/admin" replace />} />
                              <Route path="/dashboard" element={<Dashboard />} />
                              <Route path="/users" element={<UserTable />} />
                              <Route path="/messages" element={<MessageTable />} />
                              <Route path="/newsletter" element={<NewsletterTable />} />
                              <Route path="/change-hero-content" element={<ChangeHeroContent />} />
                              <Route path="/change-service-content" element={<ChangeServiceContent />} />
                              <Route path="/change-about-content" element={<ChangeAboutContent />} />
                              <Route path="/change-mission-vision-content" element={<ChangeMissionVisionContent />} />
                              <Route path="/change-base-content" element={<ChangeBaseContent />} />
                              <Route path="/change-latest-product" element={<ChangeLatestProduct />} />
                              <Route path="/change-contact-content" element={<ChangeContact />} />
                              <Route path="/applications" element={<ApplicationList />} />
                              <Route path="/admin/applicants/:id" element={<ApplicantData />} />
                            </Route>
                          </Routes>

                        </ApplicationProvider>
                      </ContactProvider>
                    </LatestProductProvider>
                  </BaseProvider>
                </MissionVisionProvider>
              </AboutProvider>
            </ServicesProvider>
          </HeroContentProvider>
        </UserProvider>

      </AdminProvider>
    </Router>
  );
}

export default App;
