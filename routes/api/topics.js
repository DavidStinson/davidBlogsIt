const express = require("express");
const router = express.Router();
const topicsCtrl = require("../../controllers/topics");

/*------------------------------ Public Routes ------------------------------*/

router.get("/", topicsCtrl.index);

/*----------------------------- Protected Routes ----------------------------*/

// Process the token for only the routes below
router.use(require("../../config/auth"));
router.post("/", checkAuth, topicsCtrl.create);
router.delete('/:id', checkAuth, topicsCtrl.delete);

/*----------------------------- Helper Functions ----------------------------*/

function checkAuth(req, res, next) {
  console.log(req.user)
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}

module.exports = router;