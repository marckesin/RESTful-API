const userRoute = require("./user");
const statusRoute = require("./status");

module.exports = app => {
  app.use(userRoute);
  app.use(statusRoute);
};
