const { Router } = require("express");
const itemConroller = require("../controllers/itemControllers");
const router = Router();

router.get("/item", itemConroller.get_items);
router.post("/items", itemConroller.post_item);
router.put("/items/:id", itemConroller.update_item);
router.delete("/items/:id", itemConroller.delete_item);

module.exports = router;
