const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        code: String,
        title: String,
        descrption: String,
        mrp: Number,
        sp: Number,
        discount: Number,
        imagepath: String
})

const product = mongoose.model('Poduct', productSchema);
module.exports = product;




// // models/profile.js
// const mongoose = require('mongoose');

// const profileSchema = new mongoose.Schema({
//     name:{  
//         type: String, 
//         required: true,
//     },
//     age: { 
//         type: Number, 
//         required: true, 
//     },
//     mobile: { 
//         type: String, 
//         required: true, 
//     },
//     email: { 
//         type: String, 
//         required: true, 
//     },
//     dob:{
//         type: Date, 
//         required: true, 
//     },
// });

// const Profile = mongoose.model('Profile', profileSchema);

// module.exports = Profile;
