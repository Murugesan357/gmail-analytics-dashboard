import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../context/useContext"; 
import "../styles/styles.css";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const SCOPES = import.meta.env.VITE_GMAIL_SCOPE;

const Login = ({ onLoginSuccess }) => {
  const { updateUser } = useUser();

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const user = {
      name: decoded.name,
      email: decoded.email,
      imageUrl: decoded.picture,
    };

    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse) => {
        if (tokenResponse && tokenResponse.access_token) {
          const fullUser = {
            ...user,
            accessToken: tokenResponse.access_token,
          };

          localStorage.setItem("user", JSON.stringify(fullUser));

          updateUser(fullUser);

          if (onLoginSuccess) {
            onLoginSuccess();
          }
        }
      },
    });

    tokenClient.requestAccessToken();
  };

  return (
    <div id="loginScreen" className="login-screen">
      <div className="login-container">
        <div className="login-header">
          <h1>Gmail Analytics Dashboard</h1>
          <p>Connect your Gmail account to get insights and analytics</p>
        </div>

        <div className="oauth-section">
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
