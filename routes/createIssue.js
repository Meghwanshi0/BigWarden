const express = require('express');
const router = express.Router();
const createIssueController = require('../controllers/createIssueController');

// Show the form to create a new issue
router.get('/:projectId/createIssue', createIssueController.showCreateForm);

// Handle form submission to create a new issue
router.post('/:projectId/createIssue', createIssueController.create);

module.exports = router;
