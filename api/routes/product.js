const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const cloudinary = require('cloudinary').v2;



cloudinary.config({ 
    cloud_name: 'drvfjg3mx', 
    api_key: '876724597139338', 
    api_secret: '0oFfDVGBvf7ulbvMUWLia11cWQk' 
  });

//Get Data  
router.get('/',checkAuth, (req, res, next) => {

    Product.find().then(result => {
        console.log(result);
        res.status(200).json({ data: result, massage: "Data reteiw succesfully!" });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })

});

// Set Data
router.post('/', (req, res, next) => {
    console.log("1");
    console.log(req.body);
    const file = req.files.photo;
    
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        console.log(result);

        const product = new Product({
            _id: new mongoose.Types.ObjectId,
            code: req.body.code,
            title: req.body.title,
            descrption: req.body.descrption,
            mrp: req.body.mrp,
            sp: req.body.sp,
            discount: req.body.discount,
            imagepath: result.url
        });

        product.save().then(result => {
            console.log(result);
            res.status(200).json({ data: result, massage: 'Data created successfully' });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    });
});

//Get data by id:
router.get('/:id', (req, res, next) => {

    console.log(req.params.id);
    Product.findById(req.params.id).then(result => {
        console.log(result);
        res.status(200).json({ data: result, massage: "Data reteiw succefullu!" });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })
})

//Delete Data
router.delete('/', (req, res, next) => {
    console.log("id",req.query.id);
    const imageurl= req.query.imageurl;
    console.log("image url",imageurl);
    const urlArray = imageurl.split('/');
    console.log(urlArray);
    const image = urlArray[urlArray.length-1];
    console.log(image);
    const imageName = image.split('.')[0];
    console.log(imageName);


    Product.findByIdAndDelete({ _id: req.query.id }).then(result => {
        cloudinary.uploader.destroy(imageName, (err, result) => {
            console.log(err,result);

        });
        console.log(result);
        res.status(200).json({ data: result, massage: "Data deleted Succesfully" });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
})

//Update Data
router.put('/:id', (req, res, next) => {
    console.log(req.params.id);
    Product.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            code: req.body.code,
            title: req.body.title,
            description: req.body.description,
            mrp: req.body.mrp,
            sp: req.body.sp,
            discount: req.body.discount,
            imagepath: req.body.imagepath
        }
    }, { new: true })
        .then(result => {
            console.log(result);
            res.status(200).json({ data: result, message: "Data Updated successfully!" });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});



module.exports = router;