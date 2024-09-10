const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { CLIENT } = require("../config/defaults");
const cors = require("cors");

const applyMiddleware = (app) => {
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: [CLIENT],
      credentials: true,
    })
  );
};

module.exports = {
  applyMiddleware,
};
