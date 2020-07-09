exports.getHome = function (req, res, next) {
  res.status(200).json({ success: true, message: "Welcome to home route!" });
};
