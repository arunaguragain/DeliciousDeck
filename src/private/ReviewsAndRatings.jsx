import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ReviewsAndRatings.css";
import axios from "axios";

const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [reviews, setReviews] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [editingReviewId, setEditingReviewId] = useState(null); // Track which review is being edited

  const navigate = useNavigate();

  // Fetch reviews from the server
  useEffect(() => {
    const fetchReviews = async () => {
      if (token) {
        try {
          const response = await axios.get("http://localhost:5001/reviews", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setReviews(response.data);
        } catch (error) {
          console.error("Error fetching reviews:", error);
          setError("Failed to fetch reviews.");
        }
      } else {
        setError("Authentication required.");
      }
    };

    fetchReviews();
  }, [token]);

  // Handle creating a new review
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    if (!userId) {
      alert("No user found.");
      return;
    }

    const reviewData = {
      ratings: rating,
      comment: review,
      email: userEmail,
      UseruserId: userId,
    };

    try {
      const response = await axios.post("http://localhost:5001/reviews/create", reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Created review: ", response.data);

      // Add the newly created review to the list
      setReviews((prevReviews) => [...prevReviews, response.data]);

      // Reset form after submission
      setReview("");
      setRating(0);
      setEditingReviewId(null); // Reset after submission
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error creating review:", error);
      setError("Failed to submit review. Please try again.");
    }
  };

  // Handle updating an existing review
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    if (!userId) {
      alert("No user found.");
      return;
    }

    const reviewData = {
      ratings: rating,
      comment: review,
      email: userEmail,
      UseruserId: userId,
    };

    try {
      console.log(`Editing review with ID: ${editingReviewId}`);
      const response = await axios.put(
        `http://localhost:5001/reviews/${editingReviewId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Updated review: ", response.data);

      // Update the review in the list without creating a new entry
      setReviews((prevReviews) =>
        prevReviews.map((r) =>
          r.reviewID === editingReviewId ? { ...r, ...response.data } : r
        )
      );

      // Reset form after submission
      setReview("");
      setRating(0);
      setEditingReviewId(null); // Reset after submission
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error updating review:", error);
      setError("Failed to update review. Please try again.");
    }
  };

  // Handle review deletion
  const handleDelete = async (reviewId) => {
    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    if (!reviewId) {
      console.error("Review ID is missing.");
      setError("Review ID is missing.");
      return;
    }

    try {
      console.log(`Deleting review with ID: ${reviewId}`);
      await axios.delete(`http://localhost:5001/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews((prevReviews) => prevReviews.filter((review) => review.reviewID !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
      setError("Failed to delete review.");
    }
  };

  // Handle review edit
  const handleEdit = (reviewId) => {
    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    const reviewToEdit = reviews.find((r) => r.reviewID === reviewId);
    if (reviewToEdit) {
      setReview(reviewToEdit.comment);
      setRating(reviewToEdit.ratings);
      setEditingReviewId(reviewId); // Set the editing review ID
      setIsFormVisible(true);
    }
  };

  return (
    <div className="review-section">
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/mainpage")}></div>
        <div className="nav-links">
          <button onClick={() => navigate("/mainpage")}>Home</button>
          <button onClick={() => navigate("/aboutus")}>About Us</button>
          <button onClick={() => navigate("/contactus")}>Contact Us</button>
        </div>
      </div>

      <div className="review_contents">
        <h2>Customer Reviews</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="reviews-list">
  {reviews.length > 0 ? (
    reviews.map((review, index) => (
      <div key={index} className="review-item">
        {/* Render email above rating */}
        <div className="review-email">
          <strong>{review.email || userEmail}</strong>
        </div>

        <div className="review-rating">
          {"★".repeat(review.ratings)}{" "}
          {"☆".repeat(5 - review.ratings)}
        </div>
        <p>{review.comment}</p>
        <small>
          {review.email} | Reviewed on {new Date(review.createdAt).toLocaleString()}
        </small>

        {/* Render Edit/Delete buttons always */}
        <div className="review-actions">
          <button className="edit-btn" onClick={() => handleEdit(review.reviewID)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => handleDelete(review.reviewID)}>
            Delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <p>No reviews yet. Be the first to review!</p>
  )}
</div>


       
        <button className="leave-review-btn" onClick={() => setIsFormVisible(true)}>
          Leave a Review
        </button>

        {isFormVisible && (
          <div className="review-form-overlay">
            <div className="review-form">
              <h3>{editingReviewId ? "Edit Review" : "Leave a Review"}</h3>
              <form onSubmit={editingReviewId ? handleUpdate : handleCreate}>
                <div className="email-input">
                  <label>Your email: </label>
                  <input type="email" value={userEmail} disabled />
                </div>
                <div className="rating">
                  <label>Rating: </label>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${rating >= star ? "filled" : ""}`}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="review-input">
                  <label>Review: </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  {editingReviewId ? "Update" : "Submit"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsFormVisible(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
