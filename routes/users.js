const express = require('express');
const app = express();
const router = express.Router();
const db = require('../db/index');

router.get('', async function(req, res, next) {
  try {
    const data = await db.query('SELECT * FROM users');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const data = await db.query('SELECT * FROM users WHERE id=$1', [
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
      'INSERT INTO users (first_name, last_name, email, photo, current_company_id) VALUES ($1, $2, $3, $4, $5)',
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.photo,
        req.body.current_company_id
      ]
    );
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

router.patch('/:id', async function(req, res, next) {
  try {
    const data = await db.query(
      'UPDATE users SET first_name=($1), last_name=($2), email=($3), photo=($4), current_company_id=($5) WHERE id=($6) RETURNING *',
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.photo,
        req.body.current_company_id,
        +req.params.id
      ]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    await db.query('DELETE FROM users WHERE id=$1', [req.params.id]);
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
