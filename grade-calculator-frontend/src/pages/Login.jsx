import axios from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    if (!email.endsWith("@vitapstudent.ac.in")) {
      alert("Only VIT-AP student emails (@vitapstudent.ac.in) are allowed");
      return;
    }

    try {
      const response = await axios.post("/auth/send-otp", { email });
      console.log(response.data);
      alert("OTP sent! Check your email.");
      localStorage.setItem("email", email);
      navigate("/verify-otp");
    } catch (err) {
      console.error("Send OTP error:", err.response ? err.response.data : err);
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="tangy-wrapper center-flex">
      <div className="retro-card small-card">
        <div className="card-header-strip">LOGIN</div>
        <div className="card-body">
          <p className="retro-text">Enter email to receive OTP</p>
          <input
            className="retro-input"
            type="email"
            placeholder="name@vitapstudent.ac.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn-retro-primary full-width" onClick={sendOtp}>
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;