import React from "react";
// import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { ProtectedRoute } from "./auth/ProtectedRoute";
import { RedirectRoute } from "./auth/RedirectRoute";
import { AuthProvider } from "./auth/AuthHook";
import Fragment from "react";

import { publicRoutes } from "./routes";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Layout =
                route.requireLogin === false ? RedirectRoute : ProtectedRoute;
              const Page = route.component;

              return (
                <Route
                  key={index}
                  exact
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                ></Route>
              );
            })}
          </Routes>
          {/* <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home/:params"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/login"
              element={
                !currentUser ? (
                  <Login />
                ) : (
                  <Navigate to="/home" replace={true} />
                )
              }
            />
            <Route
              exact
              path="/signup"
              element={
                !currentUser ? (
                  <Signup />
                ) : (
                  <Navigate to="/home" replace={true} />
                )
              }
            />
            <Route
              exact
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/threads/:threadID/details"
              element={
                <ProtectedRoute>
                  <Thread />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/qChallenge"
              element={
                <ProtectedRoute>
                  <QuickChallenge />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/quizPage"
              element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/lChallenge"
              element={
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatSection />
                </ProtectedRoute>
              }
            />
          </Routes> */}
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
