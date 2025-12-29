const router = require("express").Router();
const Course = require("../models/CourseData");
const { adminAuth } = require("../middleware/auth");

router.use(adminAuth);

router.post("/course", async (req, res) => {
  const { courseCode, courseName, hasLab, hasProject } = req.body;
  await Course.create({ courseCode, courseName, hasLab, hasProject });
  res.json({ message: "Course added" });
});

router.post("/slot", async (req, res) => {
  const { courseCode, slotName, faculties } = req.body;
  await Slot.create({ courseCode, slotName, faculties });
  res.json({ message: "Slot added" });
});

module.exports = router;
