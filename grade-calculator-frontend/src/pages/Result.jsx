import { useState, useEffect } from "react";
import axios from "../api/axios";
import NoData from "./NoData";

function Result() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchAllResults();
  }, []);

  const fetchAllResults = async () => {
    try {
      const res = await axios.get("/marks/all-results");
      setResults(res.data);
    } catch (err) {
      alert("Error fetching results");
    }
  };

  return (
    <div className="tangy-wrapper">
      <div className="tangy-container">
        <h2 className="section-title">ALL RESULTS</h2>
        
        <div className="retro-card">
          <div className="card-body">
            {results.message ? (
              <p>{results.message}</p>
            ) : (
              <div className="table-wrapper">
                <table className="retro-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Course</th>
                      <th>Slot</th>
                      <th>Faculty</th>
                      <th>Total</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => (
                      <tr key={`${r.email}-${r.courseCode}-${r.slot}`}>
                        <td>{r.email}</td>
                        <td>{r.courseCode}</td>
                        <td>{r.slot}</td>
                        <td>{r.faculty}</td>
                        <td>{r.total}</td>
                        <td><span className="retro-badge">{r.grade}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;