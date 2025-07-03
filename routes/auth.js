import express from 'express';
import { handleLogin, handleLogout, handleRefreshToken, handleSignUp } from '../controllers/user.js';
const router = express.Router();


router.post("/register",handleSignUp);
router.post("/login",handleLogin)
router.post("/refreshToken",handleRefreshToken)
router.post("/logout",handleLogout)


export default router;
