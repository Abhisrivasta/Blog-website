import express from "express";
import { handleCreatePost, handleDeletePost, handleDisplayPost, handleGetAllPosts, handleUpdatePost } from "../controllers/blogPost.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/blogPost",protect, handleCreatePost);
router.get("/blogPost/:slug",protect, handleDisplayPost)
router.patch("/blogPost/:slug",protect,handleUpdatePost)
router.delete("/blogPost/:slug",protect,handleDeletePost)


router.get("/all-blogPost",handleGetAllPosts)

export default router; 
