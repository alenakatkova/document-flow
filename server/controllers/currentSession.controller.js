const { Team } = require("../models");

exports.getCurrentSession = async (req, res) => {
  try {
    const userId = req.session.team_id;

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
Footer
