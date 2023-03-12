import { defineStore } from "pinia";

const store = () => {
  const days = [
    { id: 1, name: "MON", fullName: "Monday" },
    { id: 2, name: "TUE", fullName: "Tuesday" },
    { id: 3, name: "WED", fullName: "Wednesday" },
    { id: 4, name: "THU", fullName: "Thursday" },
    { id: 5, name: "FRI", fullName: "Friday" },
    { id: 6, name: "SAT", fullName: "Saturday" },
  ];

  
  return {
    days
  }
}
export const useTimetableStore = defineStore("timetable", store);