import app from "./server";
import * as dotenv from "dotenv";
import config from "./config";

dotenv.config();

const port = config.port;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
