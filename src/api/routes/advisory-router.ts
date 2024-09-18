import express from 'express';
import { getAdvisories, submitAdvisory } from '../controllers/advisory-controller';

const router = express.Router();

router.route('/advisories')
  .get(getAdvisories)
  .post(submitAdvisory);

export default router;
