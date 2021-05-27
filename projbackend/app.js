require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

const app = express();
const port = process.env.PORT||3000;
//DB connection
mongoose.connect(process.env.DATABASE,{
                    useNewUrlParser : true,
                    useUnifiedTopology : true,
                    useCreateIndex : true
})
.then(()=>{
    console.log("DB connected......");
})
.catch((err)=>console.log("error occured....."));

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);


app.listen(port,()=>console.log(`app is running at port ${port}`));