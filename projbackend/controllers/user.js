const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user) {
            return res.status(400).json({
                error : "No User was found in DB"
            });
        }
        req.profile = user;
        next();
    });
}
exports.getUser = (req,res) => {

    //hiding unuseful information
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

// exports.getAllUsers = (req,res) =>{
//     User.find().exec((err,users)=>{
//         if(err || !users)
//             return res.status(400).json({
//                 error : "No USERS found"
//             });

//         return res.status(200).json({
//             "Users":users,
//             "second user email":users[1].email
//         })
//     })
// }

exports.updateUser = (req,res) =>{
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},
        (err , user) => {
            if(err)
                return res.status(400).json({
                    error : "Update Unsuccessful"
                });
            return res.json(user);
        }
    )
}

exports.userPurchaseList = (req,res) => {
    Order.find({ user: req.profile._id }).
    populate("user" ,"_id name").
    exec((err,order) => {
        if(err){
            return res.status(400).json({
                error :"error in retrieving orders"
            });
        }
        return res.json(order);
    })
    
}

exports.pushOrderPurchaseList = (req,res,next) => {
    
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id : product._id,
            name : product.name,
            description : product.description,
            quantity : product.quantity,
            category : product.category,
            amount : req.body.order.amount,
            transaction_id : req.body.order.transaction_id
        });
    });
    //pushing order data into database

    User.findOneAndUpdate(
        { _id : req.profile._id },
        { $push : { purchases : purchases }},
        { new : true },
        ( err, purchases ) => {
            if(err){
                return res.status(400).json({
                    error :"Error in updating the order list"
                })
            }
            next();
        }
    );
}