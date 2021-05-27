const express = require('express');
 
const app = express();

const port = 3000;

app.get('/',(req,res)=>res.send("<h1><i>Home Page</i></h1>"));

const admin = (req,res)=>{
    res.send("<h1><i>Admin Home Page......</i></h1>");
}

const isAdmin = (req,res,next)=>{
    console.log("isAdmin is running.......");
    next();
};

const isLoggedIn = (req,res,next)=>{
    console.log("Logged In Successfully...");
    next();
};

app.get("/admin",isAdmin,isLoggedIn,admin);

app.get("/login",(req,res)=>res.send("<h1><i>Hey user,welcome back .......</i></h1>"));

app.get("/signout",(req,res)=>res.send("<h1>Bye..........Visit Again</h1>"));

app.listen(port,()=>console.log(`listening on port ${port}`));