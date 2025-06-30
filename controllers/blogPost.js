import BlogPost from "../models/BlogPost.js";

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') 
    .replace(/\s+/g, '-')    
}


//This is my create post function 
export async function handleCreatePost(req, res) {
  const { title, author, datetime, backcoverImage, tags, readingTime, slug,body } = req.body;

  if (!title || !author || !slug) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  const finalSlug = slug || generateSlug(title);

  try {
    const post = await BlogPost.create({
      title,
      author,
      datetime: datetime || new Date(),
      backcoverImage,
      tags,
      readingTime,
      slug:finalSlug,
      body
    });

    return res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create post", error: error.message });
  }
}


//This is my display Post function
export async function handleDisplayPost(req, res) {
  const { slug } = req.params;

  try {
    const blog = await BlogPost.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    return res.status(200).json({ message: "Blog fetched successfully", blog });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving blog", error: error.message });
  }
}


//This is my update post futnion
export async function handleUpdatePost(req, res) {
  const { slug } = req.params;

  if (!slug) {
    return res.status(400).json({ message: "Slug is required to update the blog." });
  }

  const { body, tags, readingTime, datetime } = req.body;

  try {
    const updatedBlog = await BlogPost.findOneAndUpdate(
      { slug },
      { body, tags, readingTime, datetime },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    return res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    return res.status(500).json({ message: "Error updating blog", error: error.message });
  }
}


//This is my delete post function
export async function handleDeletePost(req, res) {
  const { slug } = req.params;

  if (!slug) {
    return res.status(400).json({ message: "Slug is required to delete the blog." });
  }

  try {
    const deletedPost = await BlogPost.findOneAndDelete({ slug });

    if (!deletedPost) {
      return res.status(404).json({ message: "Blog not found." });
    }

    return res.status(200).json({ message: "Blog deleted successfully", blog: deletedPost });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
}


//This is function to view all post

export async function handleGetAllPosts(req, res) {
  try {
    const posts = await BlogPost.find(); 
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching blog posts", error: error.message });
  }
}
