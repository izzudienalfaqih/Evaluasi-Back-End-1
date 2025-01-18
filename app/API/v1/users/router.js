const { authenticateUser } = require("../../../middleware/auth");
const { signUp, signIn, profile, update } = require("./controller");
const router = require("express").Router();

router.post("/users/signUp", signUp);
router.post("/users/signIn", signIn);
router.get("/users/profile", authenticateUser, profile);
router.put("/users/profile", authenticateUser, update);

module.exports = router;
