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
  
  const id = req.params.id.slice(3)
  
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

app.get("/getPolygonByUser/:id", (req,res,next)=>{
  const id =  req.params.id.slice(3);
  db.query(
    "SELECT * FROM user_geometry WHERE user_id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result)
      }
    }
  );
})

app.get("/getAllPolygon", (req,res,next)=>{
  db.query(
    "SELECT * FROM user_geometry",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result)
      }
    }
  );
})

app.post("/insertUserGeometry", (req,res,next)=>{
  const id = req.body.idname
  const latlong = req.body.latlong
  const namear = req.body.namear
  const disar = req.body.disar
  db.query(
    "INSERT INTO `user_geometry`(`user_id`, `geometry_data`, `namear`, `disar` , `created_date` , `updated_date`) VALUES (?,?,?,?,NOW(),NOW())",
    [id,latlong,namear,disar],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Successfully Insert");
      }
    }
  );
})

app.get("/getdatauser/:id", (req, res, next) => {
  console.log(req.params.id);
  const id = req.params.id.slice(3)
  console.log(id);
  db.query("SELECT * FROM user_geometry WHERE user_id = ?",[id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
