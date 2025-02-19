const { getUser } = require("../service/auth");

const restrictToLoggedInUserOnly = async (req, res, next) => {
  const userUid = req.cookies?.uid;
  if (!userUid) res.redirect("/login");
  const user = getUser(userUid);
  if (!user) res.redirect("/login");
  req.user = user;
  next();
};
const checkAuth = async (req, res, next) => {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
};

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth,
};
