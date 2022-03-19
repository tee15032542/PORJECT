const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "geodb",
});

app.get("/getUserId/:id", (req, res, next) => {
  const id = req.params.id
  db.query("SELECT * FROM user_turbine WHERE user_id = ?",[id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/userRegister/", (req, res, next) => {
  const id = req.body.id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const tel = req.body.tel;
  const email = req.body.email;
  db.query(
    "INSERT INTO user_turbine (user_id,first_name,last_name,tel,email) VALUES(?,?,?,?,?)",
    [id,firstname,lastname,tel,email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Succesfully Register");
      }
    }
  );
});

app.post("/getPolygonByUser/:id", (req,res,next)=>{
  const id =  req.body.id;
  db.query(
    "INSERT INTO user_turbine (user_id,first_name,last_name,tel,email) VALUES(?,?,?,?,?)",
    [id,firstname,lastname,tel,email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res
      }
    }
  );
})

app.post("/userinsertdb", (req,res,next)=>{
  const id = req.body.idname
  const latlong = req.body.latlong
  console.log(id);
  console.log(latlong);
  db.query(
    "INSERT INTO `geometry`(`user_id`, `geometry_data`) VALUES (?,?)",
    [id,latlong],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("successfuly");
      }
    }
  );
})

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
