export const scheduleData = {
  monday: [
    { time: "09:00-10:00", subject: "Data Structures", teacher: "Dr. Rajesh Kumar", room: "Lab 101" },
    { time: "10:15-11:15", subject: "Web Development", teacher: "Prof. Meena Gupta", room: "Room 203" },
    { time: "11:30-12:30", subject: "Database Design", teacher: "Ms. Anjali Verma", room: "Lab 201" },
    { time: "01:30-02:30", subject: "JavaScript", teacher: "Prof. Meena Gupta", room: "Lab 105" },
  ],
  tuesday: [
    { time: "09:00-10:00", subject: "Algorithms", teacher: "Dr. Rajesh Kumar", room: "Room 204" },
    { time: "10:15-11:15", subject: "Digital Circuits", teacher: "Dr. Vikram Singh", room: "Lab 301" },
    { time: "11:30-12:30", subject: "SQL", teacher: "Ms. Anjali Verma", room: "Lab 202" },
    { time: "02:30-03:30", subject: "Microprocessors", teacher: "Dr. Vikram Singh", room: "Room 305" },
  ],
  wednesday: [
    { time: "09:00-10:00", subject: "Data Structures", teacher: "Dr. Rajesh Kumar", room: "Lab 101" },
    { time: "10:15-11:15", subject: "Database Design", teacher: "Ms. Anjali Verma", room: "Lab 201" },
    { time: "01:30-02:30", subject: "Web Development", teacher: "Prof. Meena Gupta", room: "Room 203" },
  ],
  thursday: [
    { time: "09:00-10:00", subject: "Algorithms", teacher: "Dr. Rajesh Kumar", room: "Room 204" },
    { time: "10:15-11:15", subject: "JavaScript", teacher: "Prof. Meena Gupta", room: "Lab 105" },
    { time: "11:30-12:30", subject: "Digital Circuits", teacher: "Dr. Vikram Singh", room: "Lab 301" },
    { time: "01:30-02:30", subject: "SQL", teacher: "Ms. Anjali Verma", room: "Lab 202" },
  ],
  friday: [
    { time: "09:00-10:00", subject: "Data Structures", teacher: "Dr. Rajesh Kumar", room: "Lab 101" },
    { time: "10:15-11:15", subject: "Web Development", teacher: "Prof. Meena Gupta", room: "Room 203" },
    { time: "02:30-03:30", subject: "Microprocessors", teacher: "Dr. Vikram Singh", room: "Room 305" },
  ],
};

export const getTodaySchedule = () => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date().getDay();
  const dayName = days[today];
  return scheduleData[dayName] || [];
};
