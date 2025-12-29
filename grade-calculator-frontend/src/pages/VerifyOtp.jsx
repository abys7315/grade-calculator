import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const verifyOtp = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await API.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("token", response.data.token);
      alert("OTP verified");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="tangy-wrapper center-flex">
      <div className="retro-card small-card">
        <div className="card-header-strip">VERIFY</div>
        <div className="card-body">
           <p className="retro-text">Check your inbox for the code.</p>
          <input
            className="retro-input"
            type="text"
            placeholder="Enter OTP Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="btn-retro-primary full-width" onClick={verifyOtp}>
            VERIFY ME
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;