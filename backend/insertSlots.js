const mongoose = require("mongoose");
const CourseData = require("./models/CourseData");
require("dotenv").config();

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/grade-calculator";
  await mongoose.connect(mongoUri);
  console.log("MongoDB Connected");
};

const insertSlots = async () => {
  // CSE2008 slots data
  const cse2008Slots = [
    {
      slotName: "A1",
      faculties: [
        "Madugula Kiran Kumar",
        "Lalitha Kumari P",
        "Voddelli SriLakshmi",
        "Palacharla Ravi Kumar",
        "Afzal Hussain Shahid"
      ]
    },
    {
      slotName: "A2",
      faculties: [
        "Palacharla Ravi Kumar",
        "POTU BHARATH",
        "Madugula Kiran Kumar",
        "Afzal Hussain Shahid",
        "Shalini Subramani",
        "GOKAPAY DILIP KUMAR"
      ]
    },
    {
      slotName: "B1",
      faculties: [
        "POTU BHARATH",
        "Annapureddy V N Reddy",
        "KOTESWARA RAO MAKKENA",
        "Suresh Dara",
        "Chirra Venkata Ramireddy"
      ]
    },
    {
      slotName: "B2",
      faculties: [
        "KOTESWARA RAO MAKKENA",
        "Chirra Venkata Ramireddy",
        "TAALAM NAGA RAJU",
        "Srinivasarao.Pokuri",
        "Annapureddy V N Reddy"
      ]
    },
    {
      slotName: "F1",
      faculties: [
        "Voddelli SriLakshmi",
        "K Aravind",
        "Sandipan Maiti",
        "Shaik Subhani",
        "TAALAM NAGA RAJU",
        "Ngangbam Indrason"
      ]
    },
    {
      slotName: "F2",
      faculties: [
        "Srinivasarao.Pokuri",
        "K Aravind",
        "Sandipan Maiti",
        "P. Kuppusamy",
        "GOKAPAY DILIP KUMAR"
      ]
    }
  ];

  // CSE3002 slots data
  const cse3002Slots = [
    {
      slotName: "A1/TA1",
      faculties: [
        "NAGAEESWARI BODAPATI",
        "Mannepuli Srujana",
        "Yarlagadda Siva Reshma",
        "Ajith Jubilson E",
        "Edara Sreenivasa Reddy",
        "Surendra Reddy Vinta"
      ]
    },
    {
      slotName: "A2/TA2",
      faculties: [
        "Suresh Dara",
        "Yarlagadda Siva Reshma",
        "Mannepuli Srujana",
        "Yallanti Sowjanya Kumari",
        "Helen Sharmila A",
        "Ajith Jubilson E",
        "Surendra Reddy Vinta"
      ]
    },
    {
      slotName: "E1/TE1",
      faculties: [
        "JANGAM PAVANI PRAVALLIKA",
        "Pamulapati Ashok Reddy",
        "Balusa Bhanu Chander",
        "Karrothu Aravind"
      ]
    },
    {
      slotName: "E1/TEE1",
      faculties: [
        "NADENLLA RAJAMOHANREDDY",
        "Mukkoti Maruthi Venkata Chalapathi"
      ]
    },
    {
      slotName: "E2/TE2",
      faculties: [
        "Pamulapati Ashok Reddy",
        "SHAIK SHABINA",
        "Balusa Bhanu Chander",
        "Karrothu Aravind",
        "Siddique Ibrahim Peer Mohamed"
      ]
    },
    {
      slotName: "E2/TEE2",
      faculties: [
        "NADENLLA RAJAMOHANREDDY"
      ]
    },
    {
      slotName: "G1/TG1",
      faculties: [
        "Yallanti Sowjanya Kumari",
        "Monali Bordoloi",
        "Burla Nagaraju"
      ]
    },
    {
      slotName: "G2/TG2",
      faculties: [
        "Burla Nagaraju"
      ]
    }
  ];

  // CSE3003 slots data
  const cse3003Slots = [
    {
      slotName: "B1/TB1",
      faculties: [
        "Mohinder Singh. B",
        "Karrothu Aravind",
        "SHAIK ASMEEN",
        "D. Paul Joseph"
      ]
    },
    {
      slotName: "B2/TB2",
      faculties: [
        "Mohinder Singh. B",
        "PALADUGU TANUSHA",
        "SHAIK ASMEEN"
      ]
    },
    {
      slotName: "C1/TC1",
      faculties: [
        "Deepanramkumar P",
        "Anil Vithalrao Turukmane",
        "Surendra Reddy Vinta",
        "Kumar Debasis"
      ]
    },
    {
      slotName: "C1/TCC1",
      faculties: [
        "G.HARANADHA BABU",
        "D. Paul Joseph"
      ]
    },
    {
      slotName: "C2/TC2",
      faculties: [
        "PARIMALA NALLAMOTU",
        "Kommerla Siva Kumar",
        "Prabha Selvaraj",
        "Tauseef Khan"
      ]
    },
    {
      slotName: "C2/TCC2",
      faculties: [
        "Kumar Debasis"
      ]
    },
    {
      slotName: "D1/TD1",
      faculties: [
        "SHAIK SHAHANAZ",
        "Saroja Kumar Rout",
        "Rajkumar Yesuraj",
        "Helen Sharmila A"
      ]
    },
    {
      slotName: "D1/TDD1",
      faculties: [
        "Gokul Yenduri"
      ]
    },
    {
      slotName: "D2/TD2",
      faculties: [
        "Gokul Yenduri",
        "Mukkoti Maruthi Venkata Chalapathi",
        "SANKURU RAVI PRAKASH",
        "Helen Sharmila A"
      ]
    },
    {
      slotName: "D2/TDD2",
      faculties: [
        "Rajkumar Yesuraj"
      ]
    }
  ];

  // CSE3004 slots data
  const cse3004Slots = [
    {
      slotName: "D1/TD1",
      faculties: [
        "Shalini Ramanathan",
        "Manomita Chakraborty"
      ]
    },
    {
      slotName: "D1/TDD1",
      faculties: [
        "PADMAVATHI LAMBU",
        "SHAIK RESHMA"
      ]
    },
    {
      slotName: "D2/TD2",
      faculties: [
        "Paidipogu Sowjanya",
        "SHAIK RESHMA"
      ]
    },
    {
      slotName: "D2/TDD2",
      faculties: [
        "GANDLA SOWMYA"
      ]
    },
    {
      slotName: "E1/TE1",
      faculties: [
        "N Lakshmipathi Anantha",
        "Bileesh P Babu",
        "Pechetti Mounika",
        "Paidipogu Sowjanya",
        "DHANIKONDA RATNA BHAVANI"
      ]
    },
    {
      slotName: "E2/TE2",
      faculties: [
        "Bileesh P Babu",
        "DHANIKONDA RATNA BHAVANI",
        "Pechetti Mounika",
        "N Lakshmipathi Anantha",
        "Yamarthi Narasimha Rao"
      ]
    },
    {
      slotName: "F1/TF1",
      faculties: [
        "Vikash Kumar Singh",
        "Prof.SRINIVASARAO GORAPALLI",
        "PADMAVATHI LAMBU",
        "MAHABOOBSUBHANI SHAIK CH",
        "GANDLA SOWMYA"
      ]
    },
    {
      slotName: "F1/TFF1",
      faculties: [
        "Varunkumar Anantharaman",
        "TANIKELLA DIVYA NAGA PAVANI"
      ]
    },
    {
      slotName: "F2/TF2",
      faculties: [
        "Prof.SRINIVASARAO GORAPALLI",
        "MAHABOOBSUBHANI SHAIK CH",
        "Varunkumar Anantharaman",
        "Aravapalli Rama Satish"
      ]
    },
    {
      slotName: "F2/TFF2",
      faculties: [
        "TANIKELLA DIVYA NAGA PAVANI"
      ]
    }
  ];

  // CSE4006 slots data
  const cse4006Slots = [
    {
      slotName: "A1/TA1",
      faculties: [
        "Rajkumar Yesuraj",
        "Beebi Naseeba"
      ]
    },
    {
      slotName: "A2/TA2",
      faculties: [
        "Pujari Jeevana Jyothi"
      ]
    },
    {
      slotName: "C1/TC1",
      faculties: [
        "Suma Kamalesh Gandhimathi",
        "Visalakshi Annepu"
      ]
    },
    {
      slotName: "C2/TC2",
      faculties: [
        "Rajasekhar Boddu"
      ]
    },
    {
      slotName: "D1/TD1",
      faculties: [
        "Chirra Venkata Ramireddy"
      ]
    },
    {
      slotName: "D1/TDD1",
      faculties: [
        "P. Kuppusamy"
      ]
    },
    {
      slotName: "D2/TD2",
      faculties: [
        "Edara Sreenivasa Reddy"
      ]
    },
    {
      slotName: "D2/TDD2",
      faculties: [
        "Annapureddy V N Reddy"
      ]
    }
  ];

  // FRL1005 slots data
  const frl1005Slots = [
    {
      slotName: "C1",
      faculties: [
        "Gaurav Sonik"
      ]
    },
    {
      slotName: "C2",
      faculties: [
        "Renuprasad Hemkiran Patki",
        "Gaurav Sonik"
      ]
    },
    {
      slotName: "D1",
      faculties: [
        "Gaurav Sonik"
      ]
    },
    {
      slotName: "F1",
      faculties: [
        "Renuprasad Hemkiran Patki"
      ]
    },
    {
      slotName: "F2",
      faculties: [
        "Gaurav Sonik"
      ]
    },
    {
      slotName: "G1",
      faculties: [
        "Renuprasad Hemkiran Patki"
      ]
    },
    {
      slotName: "G2",
      faculties: [
        "Gaurav Sonik"
      ]
    }
  ];

  // FRL1001 slots data
  const frl1001Slots = [
    {
      slotName: "C1",
      faculties: [
        "Chandan Vishwas"
      ]
    },
    {
      slotName: "C2",
      faculties: [
        "Chandan Vishwas"
      ]
    },
    {
      slotName: "F1",
      faculties: [
        "Chandan Vishwas"
      ]
    },
    {
      slotName: "F2",
      faculties: [
        "Chandan Vishwas"
      ]
    },
    {
      slotName: "G1",
      faculties: [
        "Chandan Vishwas"
      ]
    }
  ];

  // FRL1004 slots data
  const frl1004Slots = [
    {
      slotName: "F2",
      faculties: [
        "Anindita Roy"
      ]
    },
    {
      slotName: "G1",
      faculties: [
        "Anindita Roy"
      ]
    }
  ];

  // CSE3015 slots data
  const cse3015Slots = [
    {
      slotName: "E1/TE1",
      faculties: [
        "Visalakshi Annepu"
      ]
    },
    {
      slotName: "E2/TE2",
      faculties: [
        "Visalakshi Annepu"
      ]
    }
  ];

  // Lib2020 slots data
  const lib2020Slots = [
    {
      slotName: "E2",
      faculties: [
        "Tanmoy Das"
      ]
    }
  ];

  // CSE4011 slots data
  const cse4011Slots = [
    {
      slotName: "E1",
      faculties: [
        "Prashant Rajam",
        "Kothandaraman"
      ]
    },
    {
      slotName: "E2",
      faculties: [
        "Prashant Rajam",
        "Kothandaraman"
      ]
    }
  ];

  try {
    // Insert CSE2008
    let cse2008 = await CourseData.findOne({ courseCode: "CSE2008" });
    if (!cse2008) {
      console.log("Course CSE2008 not found, creating it");
      cse2008 = new CourseData({
        courseCode: "CSE2008",
        courseName: "Operating Systems",
        hasLab: true,
        hasProject: false
      });
    }
    cse2008.slots = cse2008Slots;
    await cse2008.save();
    console.log("Slots inserted/updated successfully for CSE2008");

    // Insert CSE3002
    let cse3002 = await CourseData.findOne({ courseCode: "CSE3002" });
    if (!cse3002) {
      console.log("Course CSE3002 not found, creating it");
      cse3002 = new CourseData({
        courseCode: "CSE3002",
        courseName: "Artificial Intelligence",
        hasLab: false,
        hasProject: false
      });
    }
    cse3002.slots = cse3002Slots;
    await cse3002.save();
    console.log("Slots inserted/updated successfully for CSE3002");

    // Insert CSE3003
    let cse3003 = await CourseData.findOne({ courseCode: "CSE3003" });
    if (!cse3003) {
      console.log("Course CSE3003 not found, creating it");
      cse3003 = new CourseData({
        courseCode: "CSE3003",
        courseName: "Computer Networks",
        hasLab: true,
        hasProject: false
      });
    }
    cse3003.slots = cse3003Slots;
    await cse3003.save();
    console.log("Slots inserted/updated successfully for CSE3003");

    // Insert CSE3004
    let cse3004 = await CourseData.findOne({ courseCode: "CSE3004" });
    if (!cse3004) {
      console.log("Course CSE3004 not found, creating it");
      cse3004 = new CourseData({
        courseCode: "CSE3004",
        courseName: "Design and Analysis of Algorithms",
        hasLab: true,
        hasProject: false
      });
    }
    cse3004.slots = cse3004Slots;
    await cse3004.save();
    console.log("Slots inserted/updated successfully for CSE3004");

    // Insert CSE4006
    let cse4006 = await CourseData.findOne({ courseCode: "CSE4006" });
    if (!cse4006) {
      console.log("Course CSE4006 not found, creating it");
      cse4006 = new CourseData({
        courseCode: "CSE4006",
        courseName: "Deep Learning",
        hasLab: false,
        hasProject: true
      });
    }
    cse4006.slots = cse4006Slots;
    await cse4006.save();
    console.log("Slots inserted/updated successfully for CSE4006");

    // Insert FRL1005
    let frl1005 = await CourseData.findOne({ courseCode: "FRL1005" });
    if (!frl1005) {
      console.log("Course FRL1005 not found, creating it");
      frl1005 = new CourseData({
        courseCode: "FRL1005",
        courseName: "German for Beginners",
        hasLab: false,
        hasProject: false
      });
    }
    frl1005.slots = frl1005Slots;
    await frl1005.save();
    console.log("Slots inserted/updated successfully for FRL1005");

    // Insert FRL1001
    let frl1001 = await CourseData.findOne({ courseCode: "FRL1001" });
    if (!frl1001) {
      console.log("Course FRL1001 not found, creating it");
      frl1001 = new CourseData({
        courseCode: "FRL1001",
        courseName: "Basic French",
        hasLab: false,
        hasProject: false
      });
    }
    frl1001.slots = frl1001Slots;
    await frl1001.save();
    console.log("Slots inserted/updated successfully for FRL1001");

    // Insert FRL1004
    let frl1004 = await CourseData.findOne({ courseCode: "FRL1004" });
    if (!frl1004) {
      console.log("Course FRL1004 not found, creating it");
      frl1004 = new CourseData({
        courseCode: "FRL1004",
        courseName: "Basic Spanish",
        hasLab: false,
        hasProject: false
      });
    }
    frl1004.slots = frl1004Slots;
    await frl1004.save();
    console.log("Slots inserted/updated successfully for FRL1004");

    // Insert CSE3015
    let cse3015 = await CourseData.findOne({ courseCode: "CSE3015" });
    if (!cse3015) {
      console.log("Course CSE3015 not found, creating it");
      cse3015 = new CourseData({
        courseCode: "CSE3015",
        courseName: "Natural Language Processing",
        hasLab: true,
        hasProject: false
      });
    }
    cse3015.slots = cse3015Slots;
    await cse3015.save();
    console.log("Slots inserted/updated successfully for CSE3015");

    // Insert Lib2020
    let lib2020 = await CourseData.findOne({ courseCode: "Lib2020" });
    if (!lib2020) {
      console.log("Course Lib2020 not found, creating it");
      lib2020 = new CourseData({
        courseCode: "Lib2020",
        courseName: "Technology, Society and Political Systems",
        hasLab: false,
        hasProject: false
      });
    }
    lib2020.slots = lib2020Slots;
    await lib2020.save();
    console.log("Slots inserted/updated successfully for Lib2020");

    // Insert CSE4011
    let cse4011 = await CourseData.findOne({ courseCode: "CSE4011" });
    if (!cse4011) {
      console.log("Course CSE4011 not found, creating it");
      cse4011 = new CourseData({
        courseCode: "CSE4011",
        courseName: "Internet of Things",
        hasLab: false,
        hasProject: true
      });
    }
    cse4011.slots = cse4011Slots;
    await cse4011.save();
    console.log("Slots inserted/updated successfully for CSE4011");

  } catch (error) {
    console.error("Error inserting slots:", error);
  }
};

const run = async () => {
  await connectDB();
  await insertSlots();
  mongoose.connection.close();
};

run();
