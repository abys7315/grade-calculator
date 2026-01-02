const mongoose = require("mongoose");
const CourseData = require("./models/CourseData");
require("dotenv").config();

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/grade-calculator";
  await mongoose.connect(mongoUri);
  console.log("MongoDB Connected");
};

const mergeSlots = (existingSlots, newSlots) => {
  for (const newSlot of newSlots) {
    let existingSlot = existingSlots.find(s => s.slotName === newSlot.slotName);
    if (!existingSlot) {
      existingSlots.push(newSlot);
    } else {
      for (const fac of newSlot.faculties) {
        if (!existingSlot.faculties.includes(fac)) {
          existingSlot.faculties.push(fac);
        }
      }
    }
  }
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
        "Afzal Hussain Shahid",
        "muneeswari",
        "Ganesh Reddy Karri"
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
        "GOKAPAY DILIP KUMAR",
        "Rajashekar ramaswamy"
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
        "Annapureddy V N Reddy",
        "Sunkara Kalyani",
        "Rajasekar Ramaswamy"
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
        "GOKAPAY DILIP KUMAR",
        "Ganesh Reddy Sir"
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
        "Karrothu Aravind",
        "rajesh duvvuru"
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
        "Siddique Ibrahim Peer Mohamed",
        "Rajesh Duvurru"
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
        "D. Paul Joseph",
        "Kodanada Raman",
        "Ramkumar D"
      ]
    },
    {
      slotName: "B2/TB2",
      faculties: [
        "Mohinder Singh. B",
        "PALADUGU TANUSHA",
        "SHAIK ASMEEN",
        "Prof.Nandha Kumar"
      ]
    },
    {
      slotName: "C1/TC1",
      faculties: [
        "Deepanramkumar P",
        "Anil Vithalrao Turukmane",
        "Surendra Reddy Vinta",
        "Kumar Debasis",
        "Deepthi Godavarthi"
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
        "Tauseef Khan",
        "Deepthi Godavarthi"
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
        "Helen Sharmila A",
        "Bommareddy Lokesh",
        "shaik reshma"
        
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
        "Helen Sharmila A",
        "Ramkumar D",
        "Bomma Reddy"
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
        "Manomita Chakraborty",
        "Udit Narayana Kar",
        "Kailash Chandra Mishra"
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
        "SHAIK RESHMA",
        "Udit Narayana Kar",
        "Jonnadula Harikiran"
      ]
    },
    {
      slotName: "D2/TDD2",
      faculties: [
        "GANDLA SOWMYA",
        "Kailash Chandra Mishra"
      ]
    },
    {
      slotName: "E1/TE1",
      faculties: [
        "N Lakshmipathi Anantha",
        "Bileesh P Babu",
        "Pechetti Mounika",
        "Paidipogu Sowjanya",
        "DHANIKONDA RATNA BHAVANI",
        "Hemant Kumar Reddy"
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
        "Aravapalli Rama Satish",
        "Naga jagadeesh bommagani",
        "Eswaraiah RayAchoti "
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
        "Chandan Vishwas",
        "Dheeraj Kumar"
      ]
    },
    {
      slotName: "C2",
      faculties: [
        "Chandan Vishwas",
        "Dheeraj Kumar"
      ]
    },
    {
      slotName: "F1",
      faculties: [
        "Chandan Vishwas",
        "Dheeraj Kumar"
      ]
    },
    {
      slotName: "F2",
      faculties: [
        "Chandan Vishwas",
        "Dheeraj Kumar"
      ]
    },
    {
      slotName: "G1",
      faculties: [
        "Chandan Vishwas",
        "Dheeraj Kumar"
      ]
    }
  ];

  // FRL1004 slots data
  const frl1004Slots = [
    {
      slotName: "A1",
      faculties: [
        "Anindita Roy"
      ]
    },{
      slotName: "A2",
      faculties: [
        "Anindita Roy"
      ]
    },{
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

  // CSE3006 slots data
  const cse3006Slots = [
    {
      slotName: "B1",
      faculties: [
        "Vodelli Sri Lakshmi",
        "Mohan Allam"
      ]
    },
    {
      slotName: "B2",
      faculties: [
        "Vodelli Sri Lakshmi",
        "Mohan Allam"
      ]
    }
  ];

  // CSE3007 slots data
  const cse0000Slots = [
    {
      slotName: "E2",
      faculties: [
        "Tauseef Khan"
      ]
    }
  ];

  // MAT2005 slots data
  const mat2005Slots = [
    {
      slotName: "A1",
      faculties: [
        "soumen kundu"
      ]
    }
  ];

  // CSE3008 slots data (Data Mining and Warehousing)
  const cse3008Slots = [
    {
      slotName: "D2",
      faculties: [
        "samuka mohanty"
      ]
    }
  ];

  // CSE4012 slots data (Foundations of Blockchain Technology)
  const cse4012Slots = [
    {
      slotName: "F1",
      faculties: [
        "Prabina kumar mishra"
      ]
    }
  ];

  // CSE4037 slots data
  const cse4037Slots = [
    {
      slotName: "B1",
      faculties: [
        "Yelepi Usha Rani"
      ]
    },
    {
      slotName: "B2",
      faculties: [
        "Yelepi Usha Rani"
      ]
    }
  ];

  // CSE2025 slots data
  const cse2025Slots = [
    {
      slotName: "A1",
      faculties: [
        "A1 all faculty"
      ]
    },
    {
      slotName: "A2",
      faculties: [
        "A2 all faculty"
      ]
    },
    {
      slotName: "B1",
      faculties: [
        "B1 all faculty"
      ]
    },
    {
      slotName: "B2",
      faculties: [
        "B2 all faculty"
      ]
    },
    {
      slotName: "C1",
      faculties: [
        "C1 all faculty"
      ]
    },
    {
      slotName: "C2",
      faculties: [
        "C2 all faculty"
      ]
    },
    {
      slotName: "D1",
      faculties: [
        "D1 all faculty"
      ]
    },
    {
      slotName: "D2",
      faculties: [
        "D2 all faculty"
      ]
    },
    {
      slotName: "E1",
      faculties: [
        "E1 all faculty"
      ]
    },
    {
      slotName: "E2",
      faculties: [
        "E2 all faculty"
      ]
    },
    {
      slotName: "F1",
      faculties: [
        "F1 all faculty"
      ]
    },
    {
      slotName: "F2",
      faculties: [
        "F2 all faculty"
      ]
    },
    {
      slotName: "G1",
      faculties: [
        "G1 all faculty"
      ]
    },
    {
      slotName: "G2",
      faculties: [
        "G2 all faculty"
      ]
    }
  ];

  // CSE1006 slots data
  const cse1006Slots = [
    {
      slotName: "G2",
      faculties: [
        "Deepsikha Mishra"
      ]
    }
  ];

  // ENG000 slots data
  const eng000Slots = [
    {
      slotName: "F2",
      faculties: [
        "Sudesh Manger"
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
    mergeSlots(cse2008.slots, cse2008Slots);
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
    mergeSlots(cse3002.slots, cse3002Slots);
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
    mergeSlots(cse3003.slots, cse3003Slots);
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
    mergeSlots(cse3004.slots, cse3004Slots);
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
    mergeSlots(cse4006.slots, cse4006Slots);
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
    mergeSlots(frl1005.slots, frl1005Slots);
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
    mergeSlots(frl1001.slots, frl1001Slots);
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
    mergeSlots(frl1004.slots, frl1004Slots);
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
    mergeSlots(cse3015.slots, cse3015Slots);
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
    mergeSlots(lib2020.slots, lib2020Slots);
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
    mergeSlots(cse4011.slots, cse4011Slots);
    await cse4011.save();
    console.log("Slots inserted/updated successfully for CSE4011");

    // Insert CSE3006
    let cse3006 = await CourseData.findOne({ courseCode: "CSE3006" });
    if (!cse3006) {
      console.log("Course CSE3006 not found, creating it");
      cse3006 = new CourseData({
        courseCode: "CSE3006",
        courseName: "Data Visualization",
        hasLab: false,
        hasProject: true
      });
    }
    mergeSlots(cse3006.slots, cse3006Slots);
    await cse3006.save();
    console.log("Slots inserted/updated successfully for CSE3006");

    // Insert CSE3007
    let cse0000 = await CourseData.findOne({ courseCode: "CSE0000" });
    if (!cse0000) {
      console.log("Course CSE0000 not found, creating it");
      cse0000 = new CourseData({
        courseCode: "CSE0000",
        courseName: "Digital Image and Processing",
        hasLab: true,
        hasProject: false
      });
    }
    mergeSlots(cse0000.slots, cse0000Slots);
    await cse0000.save();
    console.log("Slots inserted/updated successfully for CSE0000");

    // Insert CSE4037
    let cse4037 = await CourseData.findOne({ courseCode: "CSE4037" });
    if (!cse4037) {
      console.log("Course CSE4037 not found, creating it");
      cse4037 = new CourseData({
        courseCode: "CSE4037",
        courseName: "Reinforcement Learning",
        hasLab: false,
        hasProject: true
      });
    }
    mergeSlots(cse4037.slots, cse4037Slots);
    await cse4037.save();
    console.log("Slots inserted/updated successfully for CSE4037");

    // Insert CSE2025
    let cse2025 = await CourseData.findOne({ courseCode: "CSE2025" });
    if (!cse2025) {
      console.log("Course CSE2025 not found, creating it");
      cse2025 = new CourseData({
        courseCode: "CSE2025",
        courseName: "AWS Solution Architecture",
        hasLab: false,
        hasProject: false
      });
    }
    mergeSlots(cse2025.slots, cse2025Slots);
    await cse2025.save();
    console.log("Slots inserted/updated successfully for CSE2025");

    // Insert CSE1006
    let cse1006 = await CourseData.findOne({ courseCode: "CSE1006" });
    if (!cse1006) {
      console.log("Course CSE1006 not found, creating it");
      cse1006 = new CourseData({
        courseCode: "CSE1006",
        courseName: "Foundation of Data Analytics",
        hasLab: true,
        hasProject: false
      });
    }
    mergeSlots(cse1006.slots, cse1006Slots);
    await cse1006.save();
    console.log("Slots inserted/updated successfully for CSE1006");

    // Insert ENG000
    let eng000 = await CourseData.findOne({ courseCode: "ENG000" });
    if (!eng000) {
      console.log("Course ENG000 not found, creating it");
      eng000 = new CourseData({
        courseCode: "ENG000",
        courseName: "Shakespearean Dramas",
        hasLab: false,
        hasProject: false
      });
    }
    mergeSlots(eng000.slots, eng000Slots);
    await eng000.save();
    console.log("Slots inserted/updated successfully for ENG000");

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
