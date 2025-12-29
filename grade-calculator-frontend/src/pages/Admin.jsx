import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Admin() {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    courseCode: "",
    courseName: "",
    hasLab: false,
    hasProject: false,
  });
  const [slot, setSlot] = useState({
    courseCode: "",
    slotName: "",
    faculties: "",
  });
  const [users, setUsers] = useState([]);

  const handleCourseChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse({
      ...course,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSlotChange = (e) => {
    setSlot({ ...slot, [e.target.name]: e.target.value });
  };

  const addCourse = async () => {
    if (!course.courseCode || !course.courseName) {
      alert("Enter course code and name");
      return;
    }
    try {
      await API.post("/admin/course", course);
      alert("Course added");
      setCourse({ courseCode: "", courseName: "", hasLab: false, hasProject: false });
    } catch (err) {
      alert("Error adding course");
    }
  };

  const addSlot = async () => {
    if (!slot.courseCode || !slot.slotName || !slot.faculties) {
      alert("Enter all fields");
      return;
    }
    try {
      const facultiesArray = slot.faculties.split(",").map((f) => f.trim());
      await API.post("/admin/slot", {
        ...slot,
        faculties: facultiesArray,
      });
      alert("Slot added");
      setSlot({ courseCode: "", slotName: "", faculties: "" });
    } catch (err) {
      alert("Error adding slot");
    }
  };

  return (
    <div className="tangy-wrapper">
      <div className="tangy-container">
        <header className="page-header">
          <h2>Admin <span className="highlight">Panel</span></h2>
          <button className="btn-retro-secondary" onClick={() => navigate("/result")}>
            View Results
          </button>
        </header>

        <div className="retro-grid">
          {/* Panel 1: Course */}
          <div className="retro-card">
            <div className="card-header-strip">NEW COURSE</div>
            <div className="card-body">
              <input
                className="retro-input"
                name="courseCode"
                placeholder="Course Code (e.g. CS101)"
                value={course.courseCode}
                onChange={handleCourseChange}
              />
              <input
                className="retro-input"
                name="courseName"
                placeholder="Course Name"
                value={course.courseName}
                onChange={handleCourseChange}
              />
              <div className="checkbox-row">
                <label className="retro-checkbox">
                  <input
                    type="checkbox"
                    name="hasLab"
                    checked={course.hasLab}
                    onChange={handleCourseChange}
                  />
                  <span>Has Lab</span>
                </label>
                <label className="retro-checkbox">
                  <input
                    type="checkbox"
                    name="hasProject"
                    checked={course.hasProject}
                    onChange={handleCourseChange}
                  />
                  <span>Has Project</span>
                </label>
              </div>
              <button className="btn-retro-primary full-width" onClick={addCourse}>
                Add Course
              </button>
            </div>
          </div>

          {/* Panel 2: Slot */}
          <div className="retro-card">
            <div className="card-header-strip color-alt">NEW SLOT</div>
            <div className="card-body">
              <input
                className="retro-input"
                name="courseCode"
                placeholder="Link Course Code"
                value={slot.courseCode}
                onChange={handleSlotChange}
              />
              <input
                className="retro-input"
                name="slotName"
                placeholder="Slot Name"
                value={slot.slotName}
                onChange={handleSlotChange}
              />
              <input
                className="retro-input"
                name="faculties"
                placeholder="Faculties (comma separated)"
                value={slot.faculties}
                onChange={handleSlotChange}
              />
              <button className="btn-retro-primary full-width" onClick={addSlot}>
                Add Slot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;