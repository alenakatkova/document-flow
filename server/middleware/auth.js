const requireAuth = (req, res, next) => {
  const { team_id } = req.session;
  
  if (!team_id) {
    return res.status(401).json({ status: "fail", message: "unauthorized" });
  }

  next();
};

module.exports = requireAuth;