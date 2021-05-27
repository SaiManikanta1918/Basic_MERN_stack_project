const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { Formidable } = require("formidable");

exports.getProductById = ( req, res, next, id) => {
    Product.findById(id)
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error:"Cannot find the product......"
            })
        }
        req.product = product;
        next();
    });
}

exports.createProduct = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error : "problem with image"
            });
        }

        //TODO:restrictions on fields
        let product = new Product(fields);

        //handle file here
        if(file.photo){
            if(file.photo.size>3*1024*1024){
                return res.status(400).json({
                    error : "Photo size is too large"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save to the DB
        product.save(( err, product) => {
            if(err){
                res.status(400).json({
                    error : "Saving tshirt in DB failed "
                })
            }
            res.json(product);
        })
    })
}