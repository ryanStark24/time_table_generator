const Generator = require('../Scheduler/Generator');
const Data = require('../Scheduler/Data');
const tester = require('../Scheduler/tester');
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/authentication');

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'You know what make a POST request with appropriate Data.'
  });
});
router.post('/', checkAuth, (req, res, next) => {
  // let data = new Data();

  let final_table = new tester(req.body);
  res.status(200).json({
    timetable: final_table
  });
  // res.render('timetable', { title: 'TimeTable', timetable: final_table });
});

module.exports = router;