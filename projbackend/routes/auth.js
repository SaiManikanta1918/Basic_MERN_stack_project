var express = require("express");
var router = express.Router();
const {check,validationResult } = require("express-validator");
const {signout,signup,signin,isSignedIn} =require("../controllers/auth");

router.post("/signup",[
    check("name","Name must be atleast 3 characters").isLength({min : 3}),
    check("email","Please enter a valid email").isEmail(),
    check("password","Password must be atleast 5 characters").isLength({min : 5})
],signup);

router.post("/signin",[
    check("email","please enter a valid email").isEmail(),
    check("password","please enter a correct password").isLength({min : 5})
],signin);


router.get("/signout",signout);

router.get("/testroute",isSignedIn,(req,res)=>{
    res.send("A protected route");
})
module.exports = router;