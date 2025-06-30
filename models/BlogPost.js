import mongoose from "mongoose";


const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
  backcoverImage: {
    type: String,
    default : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  readingTime: { type: String },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  body:{
    type:String,
    required:true
  },
  tags: [{ type: String }],
});


const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;