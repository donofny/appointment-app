const db = require("./database.js")
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = 3000;
const key = "amtelcokey"; //store in secure location

const app = express();
app.use(express.json());
app.use(cors());



app.use( '/api/appointment', authenticateToken);
app.post("/api/authenticate", (req, res) => {
  const data = req.body;
  if (data.username) {
    //find user in database
    const user = db.findUserByUsername(data.username);
    if (user) {
      if (user.password === data.password) {
        const token = generateToken(user);
        res.send({ token });
      }
    }
  }
  res.send({ token: null });
});
app.get("/api/appointment", (req, res) => {
    const appointments = db.getAppointments(req.user.id)
    res.send(appointments);
})
app.get("/api/appointment/:id", (req, res) => {
    const appointment = db.getAppointment(req.params.id)
    if(appointment){
        res.send(appointment);
    }
    else{
        res.status(404).send();
    }
})
app.put("/api/appointment/:id", (req, res) => {
    const appointment = db.updateAppointment(req.params.id, req.body)
    if(appointment){
        res.send(appointment);
    }
    else{
        res.status(404).send();
    }
})
app.delete("/api/appointment/:id", (req, res) => {
    const isDeleted = db.deleteAppointment(req.params.id)
    if(isDeleted){
        res.status(204).send();
    }
    else{
        res.status(404).send();
    }
})

app.post("/api/appointment", (req, res) => {
    const userID = req.user.id;
    const appt = db.createAppointment(userID, req.body)
    res.send(appt);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function generateToken(user) {
  return jwt.sign({id: user.id, username: user.username} , key, { expiresIn: "1800s" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, key, (err, user) => {

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}
