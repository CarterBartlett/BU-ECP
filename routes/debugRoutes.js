const keys = require('../config/keys');

module.exports = app => {
  app.get('/debug', (req, res) => {
    res.send(`
        <h2>You have reached the debug route</h2>
        <h4>This route should only be accessible in development environments!</h4>
        <ul>
            <li><a href="/debug/env">/env</a></li>
            <li><a href="/debug/keys">/keys</a></li>
            <li><a href="/debug/user">/user</a></li>
    </ul>
        <p>Currently running node <b>v${process.env.npm_config_node_version}</b> in <b>${process.env.NODE_ENV}</b> environment on <b>${process.env.COMPUTERNAME}</b></p>
        `);
  });
  app.get('/debug/env', (req, res) => {
    res.json(process.env);
  });
  app.get('/debug/keys', (req, res) => {
    res.json(keys);
  });
  app.get('/debug/user', (req,res) => {
    res.json(req.user);
  });
};
