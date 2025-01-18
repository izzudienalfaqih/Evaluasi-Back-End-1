const { authenticatePengguna } = require("../../../middleware/auth");
const { signUp, signIn, profile, update } = require("./controller");
const router = require("express").Router();

router.post("/pengguna/signUp", signUp);
router.post("/pengguna/signIn", signIn);
router.get("/pengguna/profile", authenticatePengguna, profile);
router.put("/pengguna/profile", authenticatePengguna, update);

module.exports = router;
