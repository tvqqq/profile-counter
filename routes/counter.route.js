const { Router } = require("express");
const router = Router();

const counterController = require("../app/controllers/counter.controller");

router.get("/", counterController.index);

module.exports = router;
