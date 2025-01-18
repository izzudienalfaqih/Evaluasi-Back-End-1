const router = require("express").Router();
const { authenticateUser } = require("../../../middleware/auth");
const { index, create, find, update, destroy } = require("./controller");

router.get("/categories", authenticateUser, index);
router.post("/categories", authenticateUser, create);
router.get("/categories/:id", authenticateUser, find);
router.put("/categories/:id", authenticateUser, update);
router.delete("/categories/:id", authenticateUser, destroy);

module.exports = router;
