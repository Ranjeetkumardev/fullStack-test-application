import Post from "../models/Post.js";

// Create Post with Images
export const createPostWithImages = async (req, res) => {
  try {
    const { title, description } = req.body;
  console.log(title, description ,req.files)
    // Check if files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    // Extract image URLs from the uploaded files
    const imageUrls = req.files.map((file) => file.path);

    const newPost = await Post.create({
      title,
      description,
      images: imageUrls,
      author: req.user._id, // Assuming user ID is being added from auth middleware
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

// Get all Posts by user
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({
      message: "Error fetching posts",
      error: err.message,
    });
  }
};





// import Post from "../models/Post.js";

// export const createPostWithImages = async (req, res) => {
//   try {
//     const { title ,description } = req.body;

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: "No images uploaded" });
//     }

//     // Extract image URLs 
//     const imageUrls = req.files.map((file) => file.path);

//     const newPost = await Post.create({
//       title,
//       description,
//       images: imageUrls,
//       author: req.user._id, 
//     });

//     res.status(201).json({
//       message: "Post created successfully",
//       post: newPost,
//     });
//   } catch (error) {
//     console.error("Error creating post:", error);
//     res.status(500).json({ error: "Error creating post" });
//   }
// };
 

// export const getPosts = async (req, res) => {
//     try {
//       const posts = await Post.find({ author: req.user._id });
//       if (!posts || posts.length === 0) {
//         return res.status(404).json({ message: "No posts found" });
//       }
 
//       res.status(200).json(posts);
//     } catch (err) {
//       console.error("Error fetching posts:", err);
//       res.status(500).json({
//         message: "Error fetching posts",
//         error: err.message,
//       });
//     }
//   };