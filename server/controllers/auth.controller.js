const { Team } = require("../models");

exports.logIn = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  if (typeof username === "string") {
    try {
      const team = await Team.findOne({
        where: {
          username: username
        }
      });

      if (!team) {
        res.status(400).json({
          status: "fail",
          message: "team not found",
        });
      }

      const isPasswordCorrect = password === team.password;
      if (isPasswordCorrect) {
        req.session.teamId = team.id;
        console.log(req.session)
        console.log(team.id)
        console.log(req.session.id)
        res.status(201).json({
          status: "success",
          data: {
            team: team.id,
          },
        });
      }
    } catch (e) {
      console.error(e)
    }
  }
};

exports.logOut = async (req, res) => {
  console.log(req.session)
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.send("Logout successful");
      }
    });
  } else {
    res.end();
  }
};