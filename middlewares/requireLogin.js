// RequireLogin middleware. Returns 401 error if user is not logged in
module.exports = (req, res, next) => {
    if (req.user == undefined) {
        return res.status(401).send({"error": "You are not logged in"});
    }
    next();
}