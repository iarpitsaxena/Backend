const { User } = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUsersById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ Error: "User not found." });
  return res.json(user);
}

async function updateUserById(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, {
    lastName: changed,
  });
  return res.json({ status: "success" });
}

async function deleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
}

async function handleCreateUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.email
  ) {
    return res.status(400).json({ Message: "All filds are required." });
  }
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "success", id: users.length });
  // });
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    gender: body.gender,
    email: body.email,
    jobTitle: body.job_title,
  });

  return res.status(201).json({
    Message: "Success",
    id: result._id,
  });
}

module.exports = {
  handleGetAllUsers,
  handleGetUsersById,
  deleteUserById,
  updateUserById,
  handleCreateUser,
};
