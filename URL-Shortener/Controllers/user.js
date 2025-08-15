// const user = require("../Models/user");
// const { v4: uuidv4 } = require("uuid");
// const { setUser, getUser, removeUser } = require("../Services/auth");

// async function handleUserSignUp(req, res) {
//   const { name, email, password } = req.body;
//   await user.create({
//     name,
//     email,
//     password,
//   });
//   return res.redirect("/");
// }
// async function handleUserLogin(req, res) {
//   const { email, password } = req.body;
//   const foundUser = await user.findOne({ email, password });
//   if (!foundUser) {
//     return res.render("login", { error: "Invalid email or password" });
//   }
//   const sessionId = uuidv4();
//   setUser(sessionId, foundUser);
//   res.cookie("sessionId", sessionId);

//   return res.redirect("/");
// }

// module.exports = {
//   handleUserSignUp,
//   handleUserLogin,
// };

// for stateless management

const user = require("../Models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser, removeUser } = require("../Services/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await user.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const foundUser = await user.findOne({ email, password });
  if (!foundUser) {
    return res.render("login", { error: "Invalid email or password" });
  }

  const token = setUser(foundUser);
  // res.cookie("sessionId", token);
  res.cookie("token", token, { httpOnly: true });

  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
