export const generateAttendanceData = () => {
  const data = [];
  const today = new Date(2025, 1, 22);
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const statuses = ["PRESENT", "ABSENT", "LATE"];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    data.push({
      id: i,
      studentId: 1,
      date: date.toISOString().split('T')[0],
      status: status,
    });
  }
  return data;
};

export const attendanceData = generateAttendanceData();
