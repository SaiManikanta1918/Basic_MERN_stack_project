const express = require("express");
const router = express.Router();

const { getUserById, getUser ,getAllUsers ,updateUser,userPurchaseList , pushOrderPurchaseList} = require("../controllers/user");
const { isSignedIn, isAuthenticated,isAdmin } = require("../controllers/auth");

router.param("userId",getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//router.get("/users",getAllUsers);//assignment
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/order/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);


module.exports = router;