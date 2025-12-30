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
  const course = await Course.findOne({ courseCode });
  if (!course) return res.status(404).json({ message: "Course not found" });
  course.slots.push({ slotName, faculties });
  await course.save();
  res.json({ message: "Slot added" });
});

module.exports = router;
