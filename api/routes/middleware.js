const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_ACCESS_TOKEN;

const authorize = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Không tìm thấy token xác thực." });
    }

    jwt.verify(token, secretKey, async (err, authorizedData) => {
      if (err) {
        return res.status(403).json({ message: "Token không hợp lệ." });
      }

      req.user = authorizedData;
      next();
    });
  }
};

exports.authorize = authorize;
