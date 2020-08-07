const express = require('express');
const router = express.Router();
const auth = require('../middleware/validateJwtToken');

router.get('/getAll', (req, res, next) => {
  res.json('/getAll req', req.body);
});

router.get('/getOne', (req, res, next) => {
  res.json('/getOne req', req.body);
});

router.post('/create', auth, (req, res, next) => {
  res.json('/create req', req.body);
});

module.exports = router;
