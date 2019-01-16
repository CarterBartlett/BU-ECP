const multer = require("multer");
const multerGoogleStorage = require("multer-google-storage");
const moment = require('moment');
const keys = require("../config/keys");

const keyfileRoot = "./config/keyfiles/";
const nameFormat = (req, file, cb) => {
  const fileName = `requests/${req.user.id}/${moment(req.timestamp).unix()}/${file.originalname}`;
  cb(null, fileName);
}

const settings = {
  keyFilename: keyfileRoot + keys.googleKeyfileName,
  projectId: keys.googleProjectId,
  bucket: keys.googleBucketName,
  filename: nameFormat
};

const uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine(settings)
});

exports.uploadHandler = uploadHandler;
