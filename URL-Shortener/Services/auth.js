// const sessionIdTouserMap = new Map();

// function setUser(id, user) {
//   sessionIdTouserMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdTouserMap.get(id);
// }

// function removeUser(id) {
//   sessionIdTouserMap.delete(id);
// }

// module.exports = {
//   setUser,
//   getUser,
//   removeUser,
// };

//-------------------------------------------------------------

// for stateless management
// const jwt = require("jsonwebtoken");
// const secret = "your_jwt_secret";

// function setUser(user) {
//   return jwt.sign(
//     {
//       _id: user._id,
//       email: user.email,
//     },
//     secret
//   );
// }

// function getUser(token) {
//   if (!token) return null;
//   return jwt.verify(token, secret);
// }

// // function removeUser(id) {
// //   sessionIdTouserMap.delete(id);
// // }

// module.exports = {
//   setUser,
//   getUser,
// };

////////////////

const jwt = require("jsonwebtoken");
const secret = "your_jwt_secret";

function setUser(user) {
  return jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role,
  }, secret);
}

function getUser(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

function removeUser(id) {
  sessionIdTouserMap.delete(id);
}

module.exports = {
  setUser,
  getUser,
  removeUser,
};
