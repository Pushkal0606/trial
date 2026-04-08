export const messagesData = [
  {
    id: 1,
    participants: [1, 101], // studentId, teacherId
    participantNames: { 1: "Aarav Kumar", 101: "Dr. Rajesh Kumar" },
    messages: [
      { senderId: 101, body: "Hello Aarav, how are you progressing with the assignment?", sentAt: new Date(2025, 1, 22, 10, 30) },
      { senderId: 1, body: "Hi Dr. Kumar, I'm doing well. Almost halfway with the implementation.", sentAt: new Date(2025, 1, 22, 11, 0) },
      { senderId: 101, body: "Great! Feel free to reach out if you need any clarification.", sentAt: new Date(2025, 1, 22, 11, 15) },
    ],
  },
  {
    id: 2,
    participants: [1, 102],
    participantNames: { 1: "Aarav Kumar", 102: "Prof. Meena Gupta" },
    messages: [
      { senderId: 102, body: "Aarav, your web project looks great!", sentAt: new Date(2025, 1, 21, 14, 30) },
      { senderId: 1, body: "Thank you Prof. Gupta! I enjoyed building it.", sentAt: new Date(2025, 1, 21, 15, 0) },
    ],
  },
  {
    id: 3,
    participants: [1, 103],
    participantNames: { 1: "Aarav Kumar", 103: "Dr. Vikram Singh" },
    messages: [
      { senderId: 103, body: "Please submit your circuit lab design before the deadline.", sentAt: new Date(2025, 1, 20, 9, 0) },
      { senderId: 1, body: "Will do Prof. Singh!", sentAt: new Date(2025, 1, 20, 10, 30) },
    ],
  },
];
