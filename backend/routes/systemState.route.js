// systemState.route.js
import express from 'express';
import { getSystemState, toggleSystemState } from '../controllers/systemState.controller.js';

const router = express.Router();

// Route to get the current system state
router.route('/')
  .get(getSystemState);

// Route to toggle the system state
router.route('/toggle')
  .post(toggleSystemState);

export default router;
