const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

module.exports = (app) => {
  //New user creation
  app.post("/api/account/signup", (req, res, next) => {
    const { body } = req;
    const { firstName, lastName, password } = body;
    let { email } = body;
    email = email.toLowerCase();

    //verify account exists
    User.find({ email: email }, (err, existingUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Could not find the user",
        });
      } else if (existingUsers.length > 0) {
        return res.send({
          success: false,
          message: "User already exists",
        });
      }
      //save the user
      const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.password = password;
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Could not create new user",
          });
        }
        return res.send({
          success: true,
          message: "User Created",
          user,
        });
      });
    });
  });

  //User session after signin
  app.post("/api/account/signin", (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;
    email = email.toLowerCase();

    User.find({ email: email, password: password }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Count not find the user",
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Invalid username or password",
        });
      }

      const user = users[0];
      //if correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server Error",
          });
        }
        return res.send({
          success: true,
          message: "Signed In",
          token: doc._id,
        });
      });
    });
  });

  //verify the user
  app.get("/api/account/verify", (req, res, next) => {
    //Get the token
    const { query } = req;
    const { token } = query;
    //verify the token
    UserSession.find({ _id: token, isDeleted: false }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "No session found",
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "Invalid token",
        });
      } else {
        return res.send({
          success: true,
          message: "Success",
          sessions,
        });
      }
    });
  });

  //user logout
  app.get("/api/account/logout", (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate(
      { _id: token, isDeleted: false },
      { isDeleted: true },
      null,
      (err, session) => {
        if (err) {
          return res.send({
            success: false,
            message: "No session found",
          });
        }
        return res.send({
          success: true,
          message: "success",
          session,
        });
      }
    );
  });
};
