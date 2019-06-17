
const isMike = (req, res, next) => {
  checkRole("mike", req, res, next);
};

const isGuest = (req, res, next) => {
  checkRole("guest", req, res, next);
};

const checkRole = (role, req, res, next) => {
  if (!req.userType || req.userType !== role) {
    res.status(403).json({
      success: false, message: "Unauthorized"
    });
  }
  else next();
};

module.exports = {
  isMike: isGuest,
  isGuest: IsGuest
};