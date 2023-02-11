const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const { accesstoken: token } = req.headers ?? {};

  jwt.verify(token ?? '', process.env.TOKEN_SECRET, (err, result) => {
    if (err) {
      res.json({ auth: false, message: "Failed to authenticate token." });
    } else {
      req.userId = result.id;
      next();
    }
  });
};

module.exports = { verifyJwt };
