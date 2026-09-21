import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Star,
  ImagePlus,
  X,
  Pencil,
  Trash2,
  Send,
  LoaderCircle,
} from "lucide-react";

import {
  fetchReviews,
  addNewReview,
  updateExistingReview,
  deleteExistingReview,
} from "../redux/features/reviewSlice";

function ReviewSection({ productId }) {
  const dispatch = useDispatch();

  const {
    reviews,
    loading,
    error,
  } = useSelector((state) => state.review);

  // ==========================================
  // REFS
  // ==========================================

  const fileInputRef = useRef(null);
  const reviewFormRef = useRef(null);

  // ==========================================
  // FORM STATE
  // ==========================================

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const [editingReviewId, setEditingReviewId] =
    useState(null);

  const [formError, setFormError] = useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  // ==========================================
  // CURRENT USER
  // ==========================================

  const getCurrentUserId = () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return null;

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      return payload.userId || payload.id || payload._id;
    } catch (error) {
      return null;
    }
  };

  const currentUserId = getCurrentUserId();

  // ==========================================
  // FETCH REVIEWS
  // ==========================================

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviews(productId));
    }
  }, [dispatch, productId]);

  // ==========================================
  // IMAGE HANDLING
  // ==========================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      setFormError("Please select a valid image.");
      return;
    }

    // Check file size - 5MB
    if (file.size > 5 * 1024 * 1024) {
      setFormError("Image size must be less than 5MB.");
      return;
    }

    setImage(file);

    setImagePreview(URL.createObjectURL(file));

    setFormError("");
  };

  // ==========================================
  // CLEAR IMAGE
  // ==========================================

  const clearImage = () => {
    setImage(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setRating(0);
    setComment("");
    clearImage();
    setEditingReviewId(null);
    setFormError("");
  };

  // ==========================================
  // SUBMIT REVIEW
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError("");
    setSuccessMessage("");

    // Rating validation
    if (!rating) {
      setFormError("Please select a rating.");
      return;
    }

    // Comment validation
    if (!comment.trim()) {
      setFormError("Please write a review.");
      return;
    }

    const formData = new FormData();

    formData.append("rating", rating);

    formData.append("comment", comment.trim());

    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingReviewId) {
        await dispatch(
          updateExistingReview({
            reviewId: editingReviewId,
            formData,
          })
        ).unwrap();

        setSuccessMessage(
          "Your review was updated successfully."
        );
      } else {
        await dispatch(
          addNewReview({
            productId,
            formData,
          })
        ).unwrap();

        setSuccessMessage(
          "Your review was added successfully."
        );
      }

      resetForm();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setFormError(
        error || "Something went wrong. Please try again."
      );
    }
  };

  // ==========================================
  // EDIT REVIEW
  // ==========================================

  const handleEdit = (review) => {
    setEditingReviewId(review._id);

    setRating(review.rating);

    setComment(review.comment);

    if (review.image) {
      setImagePreview(
        review.image.startsWith("http")
          ? review.image
          : `https://sneak-in-backend.onrender.com${review.image}`
      );
    } else {
      setImagePreview("");
    }

    setImage(null);

    setFormError("");
    setSuccessMessage("");

    // Scroll directly to the review form
    setTimeout(() => {
      reviewFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // ==========================================
  // DELETE REVIEW
  // ==========================================

  const handleDelete = async (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your review?"
    );

    if (!confirmed) return;

    try {
      await dispatch(
        deleteExistingReview(reviewId)
      ).unwrap();

      setSuccessMessage(
        "Your review was deleted successfully."
      );

      if (editingReviewId === reviewId) {
        resetForm();
      }

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setFormError(
        error || "Unable to delete the review."
      );
    }
  };

  // ==========================================
  // IMAGE URL
  // ==========================================

  const getImageUrl = (image) => {
    if (!image) return "";

    return image.startsWith("http")
      ? image
      : `https://sneak-in-backend.onrender.com${image}`;
  };

  // ==========================================
  // CALCULATE RATING
  // ==========================================

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) =>
              total + Number(review.rating),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  // ==========================================
  // RATING DISTRIBUTION
  // ==========================================

  const getRatingCount = (value) => {
    return reviews.filter(
      (review) => Number(review.rating) === value
    ).length;
  };

  // ==========================================
  // STAR COMPONENT
  // ==========================================

  const RatingStars = ({
    value,
    interactive = false,
    size = 18,
  }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={
              interactive
                ? () => setRating(star)
                : undefined
            }
            className={
              interactive
                ? "transition hover:scale-110"
                : "pointer-events-none"
            }
            aria-label={
              interactive
                ? `Rate ${star} stars`
                : undefined
            }
          >
            <Star
              size={size}
              className={`${
                star <= value
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="border-b border-slate-200 pb-7">

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-500">
          Customer Feedback
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
          Customer Reviews
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          See what other customers think about this product.
        </p>

      </div>

      {/* ==========================================
          RATING SUMMARY
      ========================================== */}

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">

        {/* Average */}

        <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-6 text-center">

          <p className="text-5xl font-black text-slate-950">
            {averageRating}
          </p>

          <div className="mt-3">
            <RatingStars
              value={Math.round(
                Number(averageRating)
              )}
              size={17}
            />
          </div>

          <p className="mt-3 text-xs font-medium text-slate-500">
            Based on {reviews.length}{" "}
            {reviews.length === 1
              ? "review"
              : "reviews"}
          </p>

        </div>

        {/* Rating Distribution */}

        <div className="flex flex-col justify-center gap-3">

          {[5, 4, 3, 2, 1].map((value) => {
            const count = getRatingCount(value);

            const percentage =
              reviews.length > 0
                ? (count / reviews.length) * 100
                : 0;

            return (
              <div
                key={value}
                className="flex items-center gap-3"
              >

                <span className="w-8 text-xs font-semibold text-slate-500">
                  {value}★
                </span>

                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-amber-400 transition-all"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

                <span className="w-6 text-right text-xs text-slate-400">
                  {count}
                </span>

              </div>
            );
          })}

        </div>

      </div>

      {/* ==========================================
          MESSAGES
      ========================================== */}

      {successMessage && (
        <div className="mt-7 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {successMessage}
        </div>
      )}

      {/* ==========================================
          FORM
      ========================================== */}

      <div
        ref={reviewFormRef}
        className="mt-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7"
      >

        <div className="flex items-center justify-between gap-4">

          <div>

            <h3 className="text-lg font-bold text-slate-950">
              {editingReviewId
                ? "Edit Your Review"
                : "Write a Review"}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Share your experience with this product.
            </p>

          </div>

          {editingReviewId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-bold text-slate-500 transition hover:text-red-500"
            >
              Cancel
            </button>
          )}

        </div>

        {/* Rating */}

        <div className="mt-6">

          <p className="mb-3 text-sm font-bold text-slate-800">
            Your Rating
          </p>

          <RatingStars
            value={rating}
            interactive
            size={26}
          />

        </div>

        {/* Comment */}

        <div className="mt-6">

          <label className="text-sm font-bold text-slate-800">
            Your Review
          </label>

          <textarea
            value={comment}
            onChange={(event) =>
              setComment(event.target.value)
            }
            rows={5}
            maxLength={1000}
            placeholder="Tell other customers about your experience..."
            className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />

          <div className="mt-2 flex justify-end">
            <span className="text-xs text-slate-400">
              {comment.length}/1000
            </span>
          </div>

        </div>

        {/* Image */}

        <div className="mt-5">

          <p className="text-sm font-bold text-slate-800">
            Add a Photo

            <span className="ml-2 text-xs font-normal text-slate-400">
              Optional
            </span>
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />

          {!imagePreview ? (
            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-6 text-sm font-semibold text-slate-500 transition hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-600"
            >
              <ImagePlus size={20} />
              Upload Review Image
            </button>
          ) : (
            <div className="relative mt-3 w-fit">

              <img
                src={imagePreview}
                alt="Review preview"
                className="h-32 w-32 rounded-xl border border-slate-200 object-cover"
              />

              <button
                type="button"
                onClick={clearImage}
                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-white shadow-md transition hover:bg-red-500"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>

            </div>
          )}

          <p className="mt-2 text-xs text-slate-400">
            JPG, PNG or WEBP. Maximum size 5MB.
          </p>

        </div>

        {/* Form Error */}

        {(formError || error) && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {formError || error}
          </div>
        )}

        {/* Submit */}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
        >

          {loading ? (
            <>
              <LoaderCircle
                size={17}
                className="animate-spin"
              />

              Saving...
            </>
          ) : (
            <>
              <Send size={17} />

              {editingReviewId
                ? "Update Review"
                : "Submit Review"}
            </>
          )}

        </button>

      </div>

      {/* ==========================================
          REVIEWS LIST
      ========================================== */}

      <div className="mt-10">

        <div className="flex items-center justify-between border-b border-slate-200 pb-4">

          <h3 className="text-lg font-bold text-slate-950">
            Recent Reviews
          </h3>

          <span className="text-xs font-medium text-slate-400">
            {reviews.length} total
          </span>

        </div>

        {loading && reviews.length === 0 ? (

          <div className="space-y-5 pt-7">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-200 p-5"
              >

                <div className="h-4 w-32 rounded bg-slate-200" />

                <div className="mt-4 h-3 w-24 rounded bg-slate-200" />

                <div className="mt-4 h-16 w-full rounded bg-slate-200" />

              </div>
            ))}

          </div>

        ) : reviews.length === 0 ? (

          <div className="py-14 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">

              <Star
                size={23}
                className="text-slate-400"
              />

            </div>

            <h4 className="mt-4 text-base font-bold text-slate-900">
              No reviews yet
            </h4>

            <p className="mt-2 text-sm text-slate-500">
              Be the first customer to review this product.
            </p>

          </div>

        ) : (

          <div className="divide-y divide-slate-200">

            {reviews.map((review) => {

              const reviewUserId =
                review.user?._id ||
                review.user;

              const isOwner =
                currentUserId &&
                reviewUserId?.toString() ===
                  currentUserId.toString();

              return (
                <article
                  key={review._id}
                  className="py-7"
                >

                  {/* User Header */}

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3">

                      {/* Avatar */}

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">

                        {review.user?.name
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}

                      </div>

                      <div>

                        <p className="text-sm font-bold text-slate-950">
                          {review.user?.name ||
                            "Customer"}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">

                          {new Date(
                            review.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}

                        </p>

                      </div>

                    </div>

                    {/* Owner Actions */}

                    {isOwner && (
                      <div className="flex items-center gap-1">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(review)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-cyan-500"
                          title="Edit review"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              review._id
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          title="Delete review"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    )}

                  </div>

                  {/* Rating */}

                  <div className="mt-4">

                    <RatingStars
                      value={review.rating}
                      size={16}
                    />

                  </div>

                  {/* Comment */}

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {review.comment}
                  </p>

                  {/* Review Image */}

                  {review.image && (
                    <div className="mt-5">

                      <img
                        src={getImageUrl(
                          review.image
                        )}
                        alt="Customer review"
                        className="h-40 w-40 rounded-2xl border border-slate-200 object-cover transition hover:scale-[1.02]"
                      />

                    </div>
                  )}

                </article>
              );
            })}

          </div>
        )}

      </div>

    </section>
  );
}

export default ReviewSection;