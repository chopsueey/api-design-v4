import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

let envConfig;

if (stage === "production") {
  envConfig = require("./prod").default; // default to interop between ES6 modules and require
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}

const defaultConfig =
  {
    stage,
    env: process.env.NODE_ENV,
    port: 3001,
    secret: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL,
    },
  }

  // envConfig will overwrite the defaultConfig keys if they are specified.
  // With that, we can set a specific environment for our app
  // and change our code dynamically, if we want to do so:
  // STAGE=production npm run dev -> will load the prod.ts file, which overwrites the port.
  // Useful for certain code to run depending on the environment:
  // logging in development, no logging in production for example.
  // We can now conditionally run certain functions in our code depending on
  // the env without much configuration: if (process.env.STAGE==="production") ...
  // This way, we only have to change one file to completely change how our app works.


export default merge(defaultConfig, envConfig)