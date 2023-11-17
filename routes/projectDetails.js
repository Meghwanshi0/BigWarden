const express = require('express');
const router = express.Router();
const projectDetailController = require('../controllers/projectDetailController');

// Show project details (bugs related to the project)
router.get('/:projectId', projectDetailController.showDetails);

// Filter by labels, search by title/description,author
router.post('/:projectId/filter', projectDetailController.filter);

// Create a new issue
router.post('/:projectId/createIssue', projectDetailController.createIssue);

module.exports = router;
