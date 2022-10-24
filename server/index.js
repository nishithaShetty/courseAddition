// server/index.js

const cors = require('cors');
const mysql =require('mysql');
const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 4000;
const app = express();
const router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true })
 
app.use(bodyParser.json());

const whitelist = ['http://localhost:3000', 'http://localhost:4000'];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
app.use(cors());
app.use(express.json())    // <==== parse request body as JSON


const connection = mysql.createConnection({
 host:'127.0.0.1',
 user:'root',
 password:'software',
 database:'student_courses',
 multipleStatements: true
});

connection.connect(err =>{
    if(err){
     connection =reconnect(connection);
   }
   });

  app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
  
    // Route for creating the post
    app.post('/create',jsonParser, (req,res)=> {
    const student_id = 4;
    var arr = req.body.student.courses;
    var studentId =req.body.student.studenId;
    
    var query1 = "INSERT INTO course_mapping(student_id,course_name) VALUES("+studentId+",'"+arr[0]+"')";
    var query2 = "INSERT INTO course_mapping(student_id,course_name) VALUES("+studentId+",'"+arr[1]+"')";
    var query3 = "INSERT INTO course_mapping(student_id,course_name) VALUES("+studentId+",'"+arr[2]+"')";

    connection.query(query1+";"+query2+";"+query3, (err,result)=>{
       if(err) {
       console.log(err)
       } else{
        flag1=true;
        res.json("success");
       }
    });
     
  })

  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

