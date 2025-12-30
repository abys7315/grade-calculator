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
    <div className="tangy-wrapper" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="retro-card small-card" style={{ maxHeight: '150px', overflow: 'auto' }}>
        <div className="card-header-strip color-alt">IMPORTANT</div>
        <div className="card-body" style={{ padding: '1rem' }}>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li>• AWS has beed added  and some other faculties of other courses also </li>
            <li>• After sending the otp,just wait for sometime ,don't send again and again</li>
            <li>• Facing internal server error so try again after 1-2 min </li>
            <li>• If you want to add anything write in the feedback</li>
            <li>• If the number of students of a particular slot and faculty is more then it will predict more accurate grades.</li>
          </ul>
        </div>
      </div>
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