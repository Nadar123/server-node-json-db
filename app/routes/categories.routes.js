const express = require('express');
const router = express.Router();

router.get('/getAll', (req, res, next) => {
  res.json('/getAll req', req.body);
});

router.post('/create', (req, res, next) => {
    res.json('/create req', req.body);
  },
);

module.exports = router;
