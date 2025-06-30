import express from "express";
import { handleCreatePost, handleDeletePost, handleDisplayPost, handleGetAllPosts, handleUpdatePost } from "../controllers/blogPost.js";

const router = express.Router();

router.post("/blogPost", handleCreatePost);
router.get("/blogPost/:slug", handleDisplayPost)
router.patch("/blogPost/:slug",handleUpdatePost)
router.delete("/blogPost/:slug",handleDeletePost)


router.get("/all-blogPost",handleGetAllPosts)

export default router; 
