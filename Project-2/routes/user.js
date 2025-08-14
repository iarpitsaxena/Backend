const {
  handleGetAllUsers,
  handleGetUsersById,
  updateUserById,
  deleteUserById,
  handleCreateUser,
} = require("../controllers/user");

const express = require("express");

const router = express.Router();

//Routes
// router.get("/api/users", async (req, res) => {
//   const allDbUsers = await User.find({});
//   const html = `
//     <ul>
//     ${allDbUsers
//       .map(
//         (user) =>
//           `<li>
//         ${user.firstName} - ${user.email}
//         </li>`
//       )
//       .join("")}

//     </ul>
//     `;
//   res.send(html);
// });

//REST APIs

router.route("/").get(handleGetAllUsers).post(handleCreateUser);

router
  .route("/:id")
  .get(handleGetUsersById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
