// const { getUser } = require("../Services/auth");

// async function restrictedToLoggedInUserOnly(req, res, next) {
//   const sessionId = req.cookies?.sessionId;
//   if (!sessionId) {
//     return res.redirect("/login");
//   }

//   const user = getUser(sessionId);
//   if (!user) {
//     return res.redirect("/login");
//   }
//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   const sessionId = req.cookies?.sessionId;

//   const user = getUser(sessionId);

//   req.user = user;
//   next();
// }

// module.exports = {
//   restrictedToLoggedInUserOnly,
//   checkAuth,
// };

//for jwt

// const { getUser } = require("../Services/auth");

// async function restrictedToLoggedInUserOnly(req, res, next) {
//   const token = req.cookies?.token;
//   if (!token) {
//     return res.redirect("/login");
//   }

//   const user = getUser(token);
//   if (!user) {
//     return res.redirect("/login");
//   }
//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   const token = req.cookies?.token;

//   const user = getUser(token);

//   req.user = user;
//   next();
// }

// module.exports = {
//   restrictedToLoggedInUserOnly,
//   checkAuth,
// };

const { getUser } = require("../Services/auth");
function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  req.user = getUser(token);
  next();
}

function restrictedTo(roles) {
  return function (req, res, next) {
    if (!req.user || !req.user.role) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("Unauthorized");
    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictedTo,
};
