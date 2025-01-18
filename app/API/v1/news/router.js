const router = require("express").Router();
const { authenticatePengguna } = require("../../../middleware/auth");
const { index, create, find, update, destroy } = require("./controller");

router.get("/news", authenticatePengguna, index);
router.post("/news", authenticatePengguna, create);
router.get("/news/:id", authenticatePengguna, find);
router.put("/news/:id", authenticatePengguna, update);
router.delete("/news/:id", authenticatePengguna, destroy);

module.exports = router;
