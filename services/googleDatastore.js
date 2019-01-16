const gstore = require('gstore-node')();
const Datastore = require('@google-cloud/datastore');

const keys = require('../config/keys');

const datastore = new Datastore({
  projectId: keys.googleProjectId,
  keyFilename: `./config/keyfiles/${keys.googleKeyfileName}`
});

gstore.connect(datastore);