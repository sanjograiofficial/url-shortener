const User = require("../model/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function userSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}
async function userLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid username or password",
    });
  const sessionId = uuidv4();
  setUser(sessionId, user)
  res.cookie('uid', sessionId)
  return res.redirect("/");
}

module.exports = {
  userSignUp,
  userLogin,
};
