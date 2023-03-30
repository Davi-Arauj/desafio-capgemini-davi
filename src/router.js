const express = require('express')

const router = express.Router()

const controller = require('./controller/sequenceController')

router.post('/sequence',controller.create);
router.get('/stats',controller.stats);


module.exports = router;

 