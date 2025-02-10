import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ReviewsAndRatings.css";

const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [email, setEmail] = useState(""); // User input email
  const [userEmail, setUserEmail] = useState("john.doe@gmail.com"); // Assume logged-in user email
  const [editingIndex, setEditingIndex] = useState(null);
  const [reviews, setReviews] = useState([
    {
      rating: 5,
      review: "Amazing food and great service!",
      date: "2025-02-01",
      email: "john.doe@gmail.com",
    },
    {
      rating: 4,
      review: "Nice ambiance, the food was good.",
      date: "2025-02-03",
      email: "jane.doe@gmail.com",
    },
    {
      rating: 5,
      review: "Amazing food and great service!",
      date: "2025-02-01",
      email: "john.doe@gmail.com",
    },
    {
      rating: 4,
      review: "Nice ambiance, the food was good.",
      date: "2025-02-03",
      email: "jane.doe@gmail.com",
    },
    {
      rating: 4,
      review: "Nice ambiance, the food was good.",
      date: "2025-02-03",
      email: "jane.doe@gmail.com",
    },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review && email) {
      const newReview = {
        rating,
        review,
        email,
        date: new Date().toLocaleDateString(),
      };
      if (editingIndex !== null) {
        const updatedReviews = [...reviews];
        updatedReviews[editingIndex] = newReview;
        setReviews(updatedReviews);
        setEditingIndex(null);
      } else {
        setReviews([...reviews, newReview]);
      }
      setReview("");
      setEmail("");
      setRating(0);
      setIsFormVisible(false);
    }
  };

  const handleEdit = (index) => {
    const reviewToEdit = reviews[index];
    setReview(reviewToEdit.review);
    setRating(reviewToEdit.rating);
    setEditingIndex(index);
    setIsFormVisible(true);
  };

  const handleDelete = (index) => {
    const filteredReviews = reviews.filter((_, i) => i !== index);
    setReviews(filteredReviews);
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
        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-rating">
                  {"★".repeat(review.rating)}{" "}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <p>{review.review}</p>
                <small>{review.email} | Reviewed on {review.date}</small>
                
                {/* Show Edit/Delete buttons only if the logged-in user wrote this review */}
                {review.email === userEmail && (
                  <div className="review-actions">
                    <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>

        {/* Leave a Review Button */}
        <button className="leave-review-btn" onClick={() => setIsFormVisible(true)}>
          Leave a Review
        </button>

        {/* Review Form Modal */}
        {isFormVisible && (
          <div className="review-form-overlay">
            <div className="review-form">
              <h3>{editingIndex !== null ? "Edit Your Review" : "Leave a Review"}</h3>
              <form onSubmit={handleSubmit}>
                <div className="email-input">
                  <label>Your email: </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
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
                  {editingIndex !== null ? "Update" : "Submit"}
                </button>
                <button type="button" className="cancel-btn" onClick={() => setIsFormVisible(false)}>
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
