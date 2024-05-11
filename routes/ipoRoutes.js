const express = require("express");
const router = express.Router();
const ipoLinkController = require("../controller/ipoLinkController");


router.route("/saveIpoLinks").post(ipoLinkController.saveIpoLinks);


module.exports = router;