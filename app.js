const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.urlencoded({extended: false});
const morgan = require('morgan');
const crypto = require('crypto');

const app = express();

app.set('view engine', 'ejs');
app.use(urlEncoded);
app.use(express.static('statics'));
app.use(morgan('dev'));
app.use(bodyParser.json());

// let fileUpload = require('./server/routes/fileupload.js')(app);

//EXPLORE CREATING YOUR OWN ERRORS, AND HOW TO CALL THEM.
//EXPLORE FILENAME AND ITS' ARGUMENTS, SPECIALLY CALLBACK. FIND OUT WHAT PROPERTIES IT HAS
const storage = multer.diskStorage({
  destination: './statics/uploads/images',
  filename: function(req, file, callback){
    if(!file.originalname.match(/\.(jpeg|png|jpg|wav)$/)){
      let err = new Error();
      err.code = 'filetype';
      return callback(err);
    } else {
      callback(null, file.originalname + '_' + Date.now());
    }
  }
});

//NOTICE: The first parameter in the callback function is the error.

app.get('/', function(req, res){
  res.render('main.ejs');
})

//EXPLORE THE STORAGE SECTION, AND EXPLORE THE DIFFERENT LIMITS YOU HAVE AVAILABLE TO YOU
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000}
}).single('myFile');


//MAKE SURE YOU EXPLORE MULTER'S DIFFERENT ERROR CODES IT HAS.
//EXPLORE SUCCESS AND MESSAGE AS PART OF RES. FIND OUT IF MULTER HAS ANYTHING TO DO WITH IT.
app.post('/', function(req, res){
  upload(req, res, function(err){
    if(err){
      if(err.code === 'LIMIT_FILE_SIZE'){
        res.json({success: false, message: 'File size is too large. Max limit is 10mb'});
      } else if(err.code === 'filetype'){
         res.json({success: false, message: 'No file type is invalid. Must be one of the following options jpeg, png, jpg, or wav'});
      } else {
        console.log(err);
        res.json({success: false, message: 'File could not be uploaded'});
      };
    } else{
      if(!req.file){
        res.json({ success: false, message: 'No file selected'});
      } else {
         res.json({ success: true, message: 'File was uploaded successfully!'});
      }
    }
  })
})



module.exports = app;
