import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "token is not found" });
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res
        .status(400)
        .json({ message: "user does not have valid userId" });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res.status(400).json({ message: "is auth error" });
  }
};
export default isAuth;
