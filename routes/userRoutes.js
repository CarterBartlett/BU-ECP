// Route handlers to manage user accounts
const User = require("../models/user");
const _ = require("lodash");
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");

module.exports = app => {
  app.get("/api/user/all", requireLogin, requireAdmin, async (req, res) => {
    const options = _(req.query)
      .pick(["start", "limit", "offset"]) // Limit down to only params we care about
      .mapValues(v => {
        // req.query stores numbers as strings, we need to convert these to actual nums
        if (Number.isNaN(v)) {
          return v;
        } else {
          return Number.parseFloat(v);
        }
      })
      .value();

    const filters = _.filter([['role', req.query.role]], e => e[1]!==undefined);
    const listOptions = {filters, ...options}
    const users = await User.list(listOptions);
    res.send(users);
  });
  app.get("/api/user/id/:id", requireLogin, requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const foundUser = await User.get(id);
      res.send(foundUser.plain());
    } catch (err) {
      switch (err.code) {
        case "ERR_ENTITY_NOT_FOUND":
          res.send({});
        default:
          res.send(err);
      }
    }
  });
  app.patch("/api/user/id/:id", requireLogin, requireAdmin, async(req,res) => {
    try {
      const { id } = req.params;
      const newProps = User.sanitize(_.omit(req.body, ['id'])); // Remove the id (we REALLY do not want to update this)
      const entity = await User.update(id, newProps);
      res.status(200).send(entity.plain());
    } catch(err) {
      res.status(400).send(err)
    }
  })
};
