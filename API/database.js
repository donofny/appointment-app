const accounts = [
  { id: 1, username: "Bob", password: "BobPassword" },
  { id: 2, username: "Fred", password: "FredPassword" },
  { id: 3, username: "George", password: "GeorgePassword" },
  { id: 4, username: "Rajit", password: "BlinkMan" },
];
const appointments = [
  {
    id: 1,
    userID: 1,
    created: "July 29, 2022 23:15",
    lastChanged: "July 29, 2022 23:45",
    start: "July 29, 2022 16:00",
    duration: 45,
    name: "Wash Car",
    description: "Time to clean the car",
  },
  {
    id: 2,
    userID: 1,
    created: "July 29, 2022 23:15",
    lastChanged: "July 29, 2022 23:45",
    start: "July 30, 2022 15:00",
    duration: 45,
    name: "Dr. Visit",
    description: "Time to visit the doctor",
  },
  {
    id: 3,
    userID: 1,
    created: "July 29, 2022 23:15",
    lastChanged: "July 29, 2022 23:45",
    start: "July 31, 2022 12:00",
    duration: 45,
    name: "Dentist Visit",
    description: "Time to clean teeth",
  },
];
let currentUniqueID = 4;

const createAppointment = (userID, app) => {
  const date = new Date().toJSON();
  const model = {
    ...app,
    id: currentUniqueID,
    userID,
    created: date,
    lastChanged: date,
  };
  appointments.push(model);
  currentUniqueID++;
  return model;
};
const getAppointment = (id) => {
  return appointments.find((a) => a.id == id);
};
const updateAppointment = (id, app) => {
  const existing = appointments.find((a) => a.id == id);
  if(!existing){
    return false;
  }
  const index = appointments.indexOf(existing);
  const date = new Date().toJSON();
  const model = {
    ...existing,
    ...app,
    id: existing.id,
    userID: existing.userID,
    created: existing.created,
    lastChanged: date,
  };
  appointments.splice(index, 1, model);
  return model;
  
};
const deleteAppointment = (id) => {
  const index = appointments.findIndex((a) => a.id == id);
  appointments.splice(index, 1);
  return index >= 0;
};
const getAppointments = (userID) => {
  return appointments.filter((a) => a.userID === userID);
};

const findUserByUsername = (username) => {
  return accounts.find((user) => user.username === username);
};

module.exports = {
  getAppointment,
  updateAppointment,
  deleteAppointment,
  createAppointment,
  findUserByUsername,
  getAppointments,
};
