import { useState } from "react";

function Feedback() {
  const [feedback, setFeedback] = useState("");

  const submitFeedback = () => {
    // For now, just alert, later can send to backend
    alert("Feedback submitted: " + feedback);
    setFeedback("");
  };

  return (
    <div className="tangy-wrapper center-flex">
      <div className="retro-card small-card">
        <div className="card-header-strip color-alt">FEEDBACK</div>
        <div className="card-body">
          <p className="retro-text">Tell us what you think!</p>
          <textarea
            className="retro-textarea"
            placeholder="Type your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button className="btn-retro-primary full-width" onClick={submitFeedback}>
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;