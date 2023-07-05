import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ChatSection from "./chat/ChatSection";


import { ProtectedRoute } from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthHook";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Thread from "./components/Thread/Thread"
import Profile from './components/profile/Profile'
import QuickChallenge from './components/Challenge/index'
import { getAllThread } from "./actions/thread";
import { getAllUser } from "./actions/user";
import QuizPage from './components/Challenge/QuizPageRender'
import Appointment from "./components/Scheduler/SchedulerPage";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("NETTEE_TOKEN"))?.token;

  useEffect(() => {
    dispatch(getAllThread());
    dispatch(getAllUser())
  }, [dispatch]);

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={
              <ProtectedRoute>
                < Home />
              </ProtectedRoute>
            } />
            <Route exact path="/home" element={
              <ProtectedRoute>
                < Home />
              </ProtectedRoute>
            } />
            <Route path="/home/:params" element={
              <ProtectedRoute>
                < Home />
              </ProtectedRoute>
            } />
            <Route exact path="/login" element={(!currentUser ? <Login /> : <Navigate to="/home" replace={true} />)} />
            <Route exact path="/signup" element={(!currentUser ? <Signup /> : <Navigate to="/home" replace={true} />)} />
            <Route exact path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>} />
            <Route exact path="/threads/:threadID/details" element={
              <ProtectedRoute>
                <Thread />
              </ProtectedRoute>} />
            <Route exact path="/qChallenge" element={
              <ProtectedRoute>
                <QuickChallenge />
              </ProtectedRoute>} />
            <Route exact path="/quizPage" element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>} />
            <Route exact path="/lChallenge" element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>} />
            <Route exact path="/chat" element={
              <ProtectedRoute>
                <ChatSection />
              </ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
