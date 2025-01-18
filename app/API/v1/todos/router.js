const router = require("express").Router();
const { authenticateUser } = require("../../../middleware/auth");
const { index, create, find, update, destroy } = require("./controller");

router.get("/todos", authenticateUser, index);
router.post("/todos", authenticateUser, create);
router.get("/todos/:id", authenticateUser, find);
router.put("/todos/:id", authenticateUser, update);
router.delete("/todos/:id", authenticateUser, destroy);

module.exports = router;
