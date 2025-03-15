const router = require("express").Router();

router.use([require('./sync.controller')]);

module.exports = router;