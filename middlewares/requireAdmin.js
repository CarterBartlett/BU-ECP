module.exports = (req,res,next) => {
  const adminRoles = ["lecturer"];
  const hasPermission = adminRoles.includes(req.user.role);

  if (hasPermission) {
    next();
  } else {
    return res.status(401).send({"error": "You do not have the required permission level to access this route"});
  }
}