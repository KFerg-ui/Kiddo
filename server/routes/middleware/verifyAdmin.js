const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const { accesstoken: token } = req.headers ?? {};

  jwt.verify(token ?? '', process.env.TOKEN_SECRET, (err, result) => {
    if (result?.admin) {
      req.userId = result.id;
      next();
    } else {
      res.json({ auth: false, message: "Failed to authenticate token." });
    }
  });
};

module.exports = { verifyAdmin };
