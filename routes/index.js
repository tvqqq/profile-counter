const { Router } = require("express");
const router = Router();
const counterRoutes = require("./counter.route");

router.use("/", counterRoutes);

module.exports = router;
