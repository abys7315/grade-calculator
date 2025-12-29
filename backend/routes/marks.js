const router = require("express").Router();
const CourseData = require("../models/CourseData");
const Marks = require("../models/Marks");
const { mean, std, grade } = require("../utils/gradeEngine");
const { auth }  = require("../middleware/auth");

router.post("/submit", auth, async (req, res) => {
  const data = req.body;

  // Check if marks already exist for the exact same student, course, slot, and faculty
  const existingExact = await Marks.findOne({
    studentEmail: data.studentEmail,
    courseCode: data.courseCode,
    slot: data.slot,
    faculty: data.faculty
  });

  if (existingExact) {
    // Update existing entry
    const theory =
      (data.cat1 / 50) * 15 +
      (data.cat2 / 50) * 15 +
      (data.internals / 30) * 30 +
      (data.theoryFat / 100) * 40;

    let finalTotal = theory;

    if (data.labInternals) {
      const lab =
        (data.labInternals / 60) * 60 +
        (data.labFat / 50) * 40;
      finalTotal = theory * 0.75 + lab * 0.25;
    }

    if (data.projectMarks) {
      finalTotal = theory * 0.75 + data.projectMarks * 0.25;
    }

    await Marks.updateOne(
      { _id: existingExact._id },
      {
        ...data,
        theoryTotal: theory,
        finalTotal
      }
    );
    return res.json({ message: "Marks updated successfully" });
  }

  // Check if marks already exist for the same student and course (any slot/faculty)
  const existingCourse = await Marks.findOne({
    studentEmail: data.studentEmail,
    courseCode: data.courseCode
  });

  if (existingCourse) {
    return res.status(400).json({ message: "Marks already entered for this course." });
  }

  // Create new entry
  const theory =
    (data.cat1 / 50) * 15 +
    (data.cat2 / 50) * 15 +
    (data.internals / 30) * 30 +
    (data.theoryFat / 100) * 40;

  let finalTotal = theory;

  if (data.labInternals) {
    const lab =
      (data.labInternals / 60) * 60 +
      (data.labFat / 50) * 40;
    finalTotal = theory * 0.75 + lab * 0.25;
  }

  if (data.projectMarks) {
    finalTotal = theory * 0.75 + data.projectMarks * 0.25;
  }

  const newMark = new Marks({
    ...data,
    theoryTotal: theory,
    finalTotal
  });
  await newMark.save();
  res.json({ message: "Marks saved" });
});

router.get("/result/:course/:slot", auth, async (req, res) => {
  const records = await Marks.find({ courseCode: req.params.course, slot: req.params.slot });

  if (records.length < 20)
    return res.json({ message: "Grades not available yet" });

  const totals = records.map(r => r.finalTotal);
  const m = mean(totals);
  const s = std(totals, m);

  let threshold = m + 1.2 * s;
  if (threshold>100) {
    threshold=100;
  }
  if(threshold<81){
    threshold=81;
  }

  const sorted = [...totals].sort((a, b) => b - a);
  if (sorted.filter(x => x > threshold).length > 4) {
    threshold = sorted[3];
  }

  const results = records.map(r => ({
    email: r.studentEmail,
    total: r.finalTotal,
    grade: grade(r.finalTotal, m, s, threshold)
  }));

  res.json(results);
});

router.get("/all-results", async (req, res) => {
  const records = await Marks.find({});

  if (records.length < 20)
    return res.json({ message: "No marks available" });

  // Group by course, slot, and faculty for grading
  const grouped = {};
  records.forEach(r => {
    const key = `${r.courseCode}-${r.slot}-${r.faculty}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(r);
  });

  const allResults = [];
  for (const key in grouped) {
    const group = grouped[key];
    const totals = group.map(r => r.finalTotal);
    const m = mean(totals);
    const s = std(totals, m);

    let threshold = m + 1.2 * s;
    if (threshold > 100) threshold = 100;
    if (threshold < 81) threshold = 81;

    const sorted = [...totals].sort((a, b) => b - a);
    if (sorted.filter(x => x > threshold).length > 4) {
      threshold = sorted[3];
    }

    group.forEach(r => {
      allResults.push({
        email: r.studentEmail,
        courseCode: r.courseCode,
        slot: r.slot,
        faculty: r.faculty,
        total: r.finalTotal,
        grade: grade(r.finalTotal, m, s, threshold)
      });
    });
  }

  res.json(allResults);
});

router.get("/user-results", auth, async (req, res) => {
  const userEmail = req.user.email;
  const userRecords = await Marks.find({ studentEmail: userEmail });

  if (userRecords.length < 1)
    return res.json({ message: "No marks available" });

  // Fetch all records for the course-slot-faculty groups the user belongs to
  const groups = {};
  userRecords.forEach(r => {
    const key = `${r.courseCode}-${r.slot}-${r.faculty}`;
    if (!groups[key]) groups[key] = { courseCode: r.courseCode, slot: r.slot, faculty: r.faculty };
  });

  const records = [];
  const pendingGroups = [];
  for (const key in groups) {
    const groupRecords = await Marks.find({
      courseCode: groups[key].courseCode,
      slot: groups[key].slot,
      faculty: groups[key].faculty
    });
    if (groupRecords.length < 20) {
      pendingGroups.push(groups[key]);
    } else {
      records.push(...groupRecords);
    }
  }

  // Group by course, slot, and faculty for grading
  const grouped = {};
  records.forEach(r => {
    const key = `${r.courseCode}-${r.slot}-${r.faculty}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(r);
  });

  const userResults = [];
  for (const key in grouped) {
    const group = grouped[key];
    const totals = group.map(r => r.finalTotal);
    const m = mean(totals);
    const s = std(totals,m);

    let threshold = m + 1.2 * s;
    if (threshold > 100) threshold = 100;
    if (threshold < 81) threshold = 81;

    const sorted = [...totals].sort((a, b) => b - a);
    if (sorted.filter(x => x > threshold).length > 4) {
      threshold = sorted[3];
    }

    // Calculate grade ranges
    const f = Math.ceil(m - 2 * s);
    const e = Math.ceil(m - 1.5 * s);
    const d = Math.ceil(m - s);
    const c = Math.ceil(m - 0.55 * s);
    const b = Math.ceil(m + 0.45 * s);
    // console.log("abhay");
    // console.log(m);
    // console.log(s);
    const gradeRanges = {
      S: `>= ${Math.ceil(threshold)}`,
      A: `${Math.ceil(b)} - ${Math.ceil(threshold)-1}`,
      B: `${Math.ceil(c)} - ${Math.ceil(b)-1}`,
      C: `${Math.ceil(d)} - ${Math.ceil(c)-1}`,
      D: `${Math.ceil(e)} - ${Math.ceil(d)-1}`,
      E: `${Math.ceil(f)} - ${Math.ceil(e)-1}`,
      F: `< ${Math.ceil(f)}`
    };

    // Get course name
    const courseData = await CourseData.findOne({ courseCode: group[0].courseCode });
    const courseName = courseData ? courseData.courseName : group[0].courseCode;

    group.forEach(r => {
      if (r.studentEmail === userEmail) {
        userResults.push({
          courseCode: r.courseCode,
          courseName,
          slot: r.slot,
          faculty: r.faculty,
          total: r.finalTotal,
          grade: grade(r.finalTotal, m, s, threshold),
          gradeRanges
        });
      }
    });
  }

  // Add pending groups
  for (const pending of pendingGroups) {
    const courseData = await CourseData.findOne({ courseCode: pending.courseCode });
    const courseName = courseData ? courseData.courseName : pending.courseCode;
    userResults.push({
      courseCode: pending.courseCode,
      courseName,
      slot: pending.slot,
      faculty: pending.faculty,
      pending: true
    });
  }

  res.json(userResults);
});

module.exports = router;
