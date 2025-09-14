//get review for a specific list

import { axiosInstance } from "./axiosInstance";

export async function getReviews(listingId) {
  const { data: reviewForSpecificList } = await axiosInstance.get(
    `/ratings/listing/${listingId}`
  );
  return reviewForSpecificList;
}

export async function deleteReview(reviewId) {
  const { data: reviewBeforeDelete } = await axiosInstance.delete(
    `/ratings/${reviewId}`
  );
  return reviewBeforeDelete;
}

export async function updateReview(reviewId, payload) {
  const { data } = await axiosInstance.patch(`/ratings/${reviewId}`, payload);
  return data;
}
