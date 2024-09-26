//#region import statements
import "dotenv/config";
import app from "./src/app.js";
import os from "os";
import dns from "dns";
import logger from "./src/utils/logger.js";
//#endregion

const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
  const hostname = os.hostname();
  dns.lookup(hostname, { family: 4 }, (err, addresses) => {
    if (err) {
      console.error("Error resolving hostname:", err);
    } else {
      console.log(`Server is running on: ${addresses}:${PORT || 3000}`);
      console.log(`Server is running on: http://localhost:${PORT || 3000}`);
    }
  });
});
