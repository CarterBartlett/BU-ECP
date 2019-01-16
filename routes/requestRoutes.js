const multer = require("../utils/multer");

const googleDataStore = require("../utils/google-datastore");
const stream = require("stream");
const mime = require("mime-types");
const path = require("path");
const _ = require("lodash");

// Required middlewares
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");

// Models
const Request = require("../models/request");
const User = require("../models/user");

module.exports = app => {
  app.get("/api/requests", requireLogin, async (req, res) => {
    const { id } = req.user;
    try {
      const options = {
        filters: [["_owner", id]]
      };
      const requests = await Request.list(options);
      res.send(requests.entities);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  app.get("/api/requests/all", requireLogin, requireAdmin, async (req, res) => {
    try {
      const qry = await Request.list();

      // Add some user info to the request obj
      const requests = await qry.entities.map(async v => {
        if (v._owner) {
          const owner = await User.get(v._owner);
          const reducedUserProps = _.pick(owner.plain(), [
            "id",
            "firstName",
            "lastName"
          ]);
          v._owner = reducedUserProps;
        }

        if (v.unitLeader) {
          const unitLeader = await User.get(v.unitLeader);
          const reducedUnitLeaderProps = _.pick(unitLeader.plain(), [
            "id",
            "firstName",
            "lastName"
          ]);
          v.unitLeader = reducedUnitLeaderProps;
        }

        return v;
      });

      // Wait for the promises within the map to resolve
      const results = await Promise.all(requests);

      res.send(results);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  app.get("/api/requests/id/:id", requireLogin, async (req, res) => {
    try {
      const { id } = req.params;
      const request = await Request.get(id);

      if (request.unitLeader) {
        const unitLeader = await User.get(request.unitLeader);
        request.unitLeader = unitLeader.plain();
      }

      if (request._owner) {
        const owner = await User.get(request._owner);
        request._owner = owner.plain();
      }

      res.send(request.plain());
    } catch (err) {
      res.send(err);
    }
  });
  app.patch("/api/requests/id/:id", requireLogin, async (req,res) => {
    try {
      const { id } = req.params;
      const newProps = Request.sanitize(_.omit(req.body, ["id"]));
      const entity = await Request.update(id, newProps);
      res.status(200).send(entity.plain());
    } catch(err) {
      res.status(400).send(err);
    }
  })
  app.get("/api/requests/form/", requireLogin, async (req, res) => {
    const { filename } = req.query;
    const origFileName = path.basename(filename);
    const file = await googleDataStore.getFile(filename);

    // Create a readstream to transfer the file back to the user
    const readStream = new stream.PassThrough();
    readStream.end(file);

    // Since we're sending a buffer stream, we need some fancy headers
    res.set("Content-disposition", `attachment; filename=${origFileName}`);
    res.set("Content-Type", mime.contentType(path.extname(origFileName)));

    readStream.pipe(res);
  });
  app.post(
    "/api/requests",
    requireLogin,
    multer.uploadHandler.single("attachedForm"),
    async (req, res) => {
      try {
        const newRequest = {
          name: req.body.name,
          unitLeader: req.body.unitLeader,
          attachedForm: req.file.filename,
          _owner: req.user.id,
          createdOn: new Date(Date.now())
        };
        const qry = await new Request(newRequest).save();
        const request = qry.entityData;
        res.send(request);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  );
  app.get("/api/requests/lecturers", requireLogin, async (req, res) => {
    const lecturers = await User.list({ filters: [["role", "lecturer"]] });
    const lecturersReducedInfo = lecturers.entities.map(lec =>
      _.pick(lec, ["id", "firstName", "lastName", "universityEmail"])
    );
    res.send(lecturersReducedInfo);
  });
};
