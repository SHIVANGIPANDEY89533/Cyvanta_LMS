const express = require('express');
const router = express.Router();
const {
  createLiveClass,
  getUpcomingLiveClasses,
} = require('../controllers/liveController');

router.post('/', createLiveClass);
router.get('/upcoming', getUpcomingLiveClasses);

module.exports = router;