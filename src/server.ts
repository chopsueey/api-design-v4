import express from "express";
import morgan from "morgan";
import { protect } from "./modules/auth";
import router from "./router";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  console.log("Hello from server.");
  res.json({ message: "hello" });

  // asynchronous errors will crash the app because
  // express is already at the bottom of the code, so it can cannot catch it.
  // however, we can catch a potential async error if we pass it to the next() function.
  // we use the try and catch blocks in our async handlers and pass any catched
  // error to the next() function. then our errorhandler receives the error.
  // if we stick to this practice (using try and catch in async handlers plus
  // next(err), we can gracefully handle any errors that could ocurr anywhere in
  // our application and either log them, save them or provide a default 404 or 500
  // webpage to let the user know what happend. our server will keep running if
  // catch the error which is what we want.)

  // mimic async error but catch it with next():
  // setTimeout(() => {
  //   next( new Error("hello"))
  // }, 1)
});

// we can also use the process.on in node.js to listen for certain events, also errors
// process.on("uncaughtException", () => {})

app.use("/api", protect, router);

app.post("/signup", createNewUser);
app.post("/login", signin);

// errorhandler
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401);
    res.json({ message: "nope" });
  }
  if (err.type === 'input') {
    res.status(400)
    return res.send('invalid input')
  } else {
    res.status(500).json({message: 'oops, that one is on us.', error: err})
  }
})

export default app;
