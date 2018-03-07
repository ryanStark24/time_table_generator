const Generator = require('../Scheduler/Generator');
const Data = require('../Scheduler/Data');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'bro'
  });
});
router.post('/', (req, res, next) => {
  let data = new Data();
  let timetable = new Generator(data.getDatafromJSON(req.body));
  let final_table = timetable.generate();
  res.status(200).json({
    timetable: final_table
  });
});

module.exports = router;