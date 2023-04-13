const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  pool
    .query(`SELECT * FROM "item" ORDER BY id`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error:', error);
      res.sendStatus(500);
    })
  // res.sendStatus(200); // For testing only, can be removed
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  // endpoint functionality
  const shelfItem = req.body;//this is grabbing the idata from the input field
  const userId = req.user.id;//this is grtabbing the correct user id 

  const queryText = `INSERT INTO "item" (description, image_url, user_id)
      VALUES ($1, $2, $3)`;//below is sending the query text, and the 2 props from the item table, abd user id is the third prop for the table
  pool.query(queryText, [shelfItem.description, shelfItem.image_url, userId])
    .then(() => res.sendStatus(201))
    .catch(error => {
      console.log('add item post failed', error);
      res.sendStatus(500);
    })
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
  const idToDelete = req.params.id;
  console.log('req.params.id:', idToDelete);
  const queryText = `DELETE FROM "item" WHERE id=$1`;
  pool.query(queryText, [idToDelete])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Error:', error);
      res.sendStatus(500);
    })
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
  const updatedItem = req.body;//this is the action.payload from shelf saga
  const itemId = req.params.id;//this is from the api/shelf/${action.payload.id} from shelf saga
  console.log('req.body',req.body)
  console.log('id',req.params.id)

  const queryText = `UPDATE item SET "description" = $1 , "image_url" = $2 WHERE id=$3`
  pool
  .query(queryText, [updatedItem.description, updatedItem.image_url, itemId])
  .then((result) => {
    res.sendStatus(200);
  
  })
  .catch(error => {
    console.log(error)
  })



});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
