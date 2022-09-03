const { Team } = require("../models");

exports.logIn = async (req, res) => {
  const { teamManagerName, password } = req.body;

  if (typeof teamManagerName === "string") {
    try {
      const team = await Team.findOne({ where: { name: teamManagerName } });
      console.log("searching...");
      console.log(team.password);
      if (!team) {
        res.status(400).json({
          status: "fail",
          message: "team not found",
        });

        return;
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
      } else {
        res.status(400).json({
          status: "fail",
          message: "incorrect manager name or password",
        });
      }
    } catch (e) {
      res.status(400).json({
        status: "fail",
      });
    }
  } else {
    throw new Error("Team manager name is not provided");
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