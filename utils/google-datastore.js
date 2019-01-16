const keys = require('../config/keys');

const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
  projectId: keys.googleProjectId,
  keyFilename: './config/keyfiles/'+keys.googleKeyfileName
});
const bucket = storage.bucket(keys.googleBucketName);

exports.getFile = async (src) => {
  try {
    const remoteFile = bucket.file(src);
    const file = await remoteFile.download();
    return file[0];
  } catch(err) {
    console.log('ERROR', err)
    return err;
  }
}