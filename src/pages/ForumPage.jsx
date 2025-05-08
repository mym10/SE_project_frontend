import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Forum.css";

// List of bad words to censor
const badWords = ["Fuck", "nigger", "slut"]; // Replace these with actual words

const censorContent = (content) => {
  let censoredContent = content;
  badWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    censoredContent = censoredContent.replace(regex, "***");
  });
  return censoredContent;
};

const staticPosts = [
  {
    id: 1,
    author: "Aditi",
    content: "Can someone help me solve this integration question?",
    subject: "Math",
    comments: [],
  },
  {
    id: 2,
    author: "Rahul",
    content: "Here's my solution for yesterday’s physics problem.",
    subject: "Physics",
    comments: [],
  },
];

const Forum = () => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("forumPosts");
    return savedPosts ? JSON.parse(savedPosts) : staticPosts;
  });

  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem("forumLikes");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  const [newPost, setNewPost] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [filter, setFilter] = useState("All");
  const [commentMap, setCommentMap] = useState({});

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("forumPosts", JSON.stringify(posts));
  }, [posts]);

  // Save likes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("forumLikes", JSON.stringify(likes));
  }, [likes]);

  const handlePost = () => {
    if (newPost.trim()) {
      const sanitizedPost = censorContent(newPost);  // Censor the new post
      const newEntry = {
        id: posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
        author: isAnonymous ? "Anonymous" : "You",
        content: sanitizedPost,
        subject: "General",
        comments: [],
      };
      setPosts([newEntry, ...posts]);
      setNewPost("");
    }
  };

  const handleComment = (postId) => {
    const comment = commentMap[postId];
    if (comment?.trim()) {
      const sanitizedComment = censorContent(comment);  // Censor the comment
      const updatedPosts = posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  author: isAnonymous ? "Anonymous" : "You",
                  content: sanitizedComment,
                },
              ],
            }
          : p
      );
      setPosts(updatedPosts);
      setCommentMap({ ...commentMap, [postId]: "" });
    }
  };

  const handleLike = (postId) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
  };

  const filteredPosts =
    filter === "All" ? posts : posts.filter((post) => post.subject === filter);

  return (
    <div className="forum-page">
      {/* <Navbar /> */}
      <div className="forum-container">
        <h1 className="forum-title">Open Student Forum</h1>

        {/* Post Input */}
        <div className="post-input">
          <textarea
            placeholder="Ask a question or share a solution..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>
          <div className="post-controls">
            <button onClick={handlePost}>Post</button>
            <label>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              Post Anonymously
            </label>
          </div>
        </div>

        {/* Filter */}
        <div className="filter-section">
          <label>Filter by Subject:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Math">Math</option>
            <option value="Physics">Physics</option>
            <option value="General">General</option>
          </select>
        </div>

        {/* Forum Feed */}
        {filteredPosts.map((post) => (
          <div key={post.id} className="forum-card">
            <h5>{post.author}</h5>
            <p>{post.content}</p>
            <p className="subject">Subject: {post.subject}</p>

            {/* Likes */}
            <button className="like-button" onClick={() => handleLike(post.id)}>
              👍 {likes[post.id] || 0}
            </button>

            {/* Comments */}
            <div className="comments">
              {post.comments.map((c, i) => (
                <div key={i} className="comment">
                  <strong>{c.author}</strong>: {c.content}
                </div>
              ))}
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentMap[post.id] || ""}
                  onChange={(e) =>
                    setCommentMap({ ...commentMap, [post.id]: e.target.value })
                  }
                />
                <button onClick={() => handleComment(post.id)}>Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Forum;
