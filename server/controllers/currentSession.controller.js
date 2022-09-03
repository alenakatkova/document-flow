const { Team } = require("../models");

exports.getCurrentSession = async (req, res) => {
  console.log("getCurrentSession")
  try {
    const teamId = req.session.teamId;

    res.status(200).json({
      status: "success",
      data: {
        team: teamId,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
    });
  }
};
