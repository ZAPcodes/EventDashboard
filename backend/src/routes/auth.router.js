import express from 'express';
import {sign,login }from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/login', login);
router.post('/signup',sign)
export default router;
