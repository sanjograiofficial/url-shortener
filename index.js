const express = require("express");
const { connectmongo } = require("./connection");
const URL = require("./model/url");
const path = require("path");
const cookieParser = require("cookie-parser");

const urlRoute = require("./router/url");
const staticRoute = require("./router/staticRouter");
const userRoute = require("./router/user");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");

const app = express();
const PORT = 8001;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectmongo("mongodb://localhost:27017/short-url").then(
  console.log("mongodb connected. http://localhost:8001")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log("server started at PORT: ", PORT));
