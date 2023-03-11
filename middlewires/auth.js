require(`dotenv`).config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //console.log('CHECK SUCCESSFUL: Your token: ' + token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = decoded;
    console.log(req.userData);
    next();
  } catch (error) {
    // 401: unauthenticated
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
