const jwt = require("jsonwebtoken");

exports.protegerRuta = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado, token requerido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

exports.verificarAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Acceso restringido a administradores" });
  }
  next();
};
