const express = require("express");
// const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");

const PORT = 3000;

//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/dummydatabase")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("mongoDB error", err);
  });

//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    Gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

//Middlewares

app.use(express.urlencoded({ extended: false }));

//logs generation
app.use((req, res, next) => {
  fs.appendFile(
    "logs.txt",
    `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
    (err) => {
      if (err) console.error("Logging error:", err);
      next();
    }
  );
});

//Routes
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
    ${allDbUsers
      .map(
        (user) =>
          `<li>
        ${user.firstName} - ${user.email}
        </li>`
      )
      .join("")}
    
    </ul>
    `;
  res.send(html);
});

//REST APIs

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});

  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ Error: "User not found." });
    return res.json(user);
  })
  .patch(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
      lastName: changed,
    });
    return res.json({ status: "success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
  });

app.post("/api/users", async (req, res) => {
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
  });
});
// app.patch("/api/users/:id", (req, res) => {
//   return res.json({ status: "pending" });
// });

// app.delete("/api/users/:id", (req, res) => {
//   return res.json({ status: "pending" });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
