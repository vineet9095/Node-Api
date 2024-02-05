const express = require('express');
const qr = require('qrcode');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'drvfjg3mx',
  api_key: '876724597139338',
  api_secret: '0oFfDVGBvf7ulbvMUWLia11cWQk'
});

async function generateQRCodeAndUploadToCloudinary(data) {
  try {
    const qrCodeDataURL = await qr.toDataURL(data);

    const cloudinaryResponse = await cloudinary.uploader.upload(qrCodeDataURL, {
      folder: 'qr_codes' // Optional: specify a folder in Cloudinary
    });

    console.log('Cloudinary response:', cloudinaryResponse);

    return cloudinaryResponse.secure_url;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

router.get('/', (req, res) => {
  const data = 'instagram.com/sen_vineet_06';

  generateQRCodeAndUploadToCloudinary(data)
    .then(imageUrl => {
      console.log('QR code generated and uploaded to Cloudinary. Image URL:', imageUrl);
      res.status(200).json({ data: imageUrl, message: "QR code created successfully!" });
    })
    .catch(error => {
      console.error('Error:', error.message);
      res.status(500).json({ error: error });
    });
});

module.exports = router;
