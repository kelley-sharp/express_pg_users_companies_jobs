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

router.get('/:id', async function(req, res, next) {
  try {
    const data = await db.query('SELECT * FROM companies WHERE id=$1', [
      req.params.id
    ]);
    const userIds = await db.query(
      'SELECT id FROM users WHERE current_company_id=$1',
      [req.params.id]
    );
    const company = data.rows[0];
    company.users = userIds.rows.map(u => u.id);
    return res.json(company);
  } catch (err) {
    return next(err);
  }
});

router.post('', async function(req, res, next) {
  try {
    const data = await db.query(
      'INSERT INTO companies (name, logo) VALUES ($1, $2) RETURNING *',
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
    const company = await db.query('SELECT name from companies WHERE id=$1', [
      req.params.id
    ]);

    await db.query('DELETE FROM companies WHERE id=$1 RETURNING *', [
      req.params.id
    ]);
    return res.json({ message: `Deleted ${company.name}` });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
