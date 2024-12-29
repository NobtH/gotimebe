const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');

// Các route cho Worker
router.post('/', workerController.createWorker);
router.get('/:id', workerController.getWorkersid);
router.get('/', workerController.getWorkers);
router.put('/:id', workerController.updateWorker);
router.delete('/:id', workerController.deleteWorker);

module.exports = router;
