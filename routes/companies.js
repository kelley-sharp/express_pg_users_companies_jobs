const express = require('express');
const app = express();
const router = express.Router();
const db = require('../db/index');

router.get('', async function(req, res, next) {
  try {
    const data = await db.query('SELECT * FROM companies');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

router.get('', async function(req, res, next) {
  try {
    const data = await db.query('SELECT * FROM companies WHERE id=$1', [
      req.params.id
    ]);
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

router.post('', async function(req, res, next) {
  try {
    const data = await db.query(
      'INSERT INTO companies (name, logo) VALUES ($1, $2)',
      [req.body.name, req.body.logo]
    );
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

router.patch('/:id', async function(req, res, next) {
  try {
    const data = await db.query(
      'UPDATE companies SET name=($1), logo=($2) WHERE id=($3) RETURNING *',
      [req.body.name, req.body.logo, +req.params.id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    await db.query('DELETE FROM companies WHERE id=$1', [req.params.id]);
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
