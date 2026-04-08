export const gradesData = [
  {
    studentId: 1,
    name: "Aarav Kumar",
    subject: "Data Structures",
    assignments: [
      { name: "Array Operations", score: 45, maxScore: 50 },
      { name: "Sorting Algorithms", score: 40, maxScore: 50 },
      { name: "Tree Traversal", score: 42, maxScore: 50 },
    ],
    finalGrade: "A (88%)",
  },
  {
    studentId: 1,
    name: "Aarav Kumar",
    subject: "Web Development",
    assignments: [
      { name: "HTML/CSS Basics", score: 48, maxScore: 50 },
      { name: "JavaScript Interactivity", score: 46, maxScore: 50 },
      { name: "Project", score: 44, maxScore: 50 },
    ],
    finalGrade: "A+ (92%)",
  },
  {
    studentId: 1,
    name: "Aarav Kumar",
    subject: "Database Design",
    assignments: [
      { name: "Schema Normalization", score: 38, maxScore: 50 },
      { name: "Query Design", score: 41, maxScore: 50 },
      { name: "Project", score: 39, maxScore: 50 },
    ],
    finalGrade: "B+ (80%)",
  },
];

export const allGradesData = [
  ...gradesData,
  {
    studentId: 2,
    name: "Bhavna Singh",
    subject: "Data Structures",
    assignments: [
      { name: "Array Operations", score: 48, maxScore: 50 },
      { name: "Sorting Algorithms", score: 47, maxScore: 50 },
      { name: "Tree Traversal", score: 46, maxScore: 50 },
    ],
    finalGrade: "A+ (94%)",
  },
];
