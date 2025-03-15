const router = require("express").Router();

router.use([require('./character.controller')]);

module.exports = router;