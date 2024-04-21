import { useMutation } from '@tanstack/react-query';
import axios from '../api/axiosCreate';

export const useReview = () => {

  const addReviewMutation = useMutation({
    mutationFn: (formData:any) => axios.post('http://localhost:3000/api/reviews/addReview', formData)
  });

  const getReviewsMutation = useMutation({
    mutationFn: (gameId:any) => axios.post(`http://localhost:3000/api/reviews/${gameId}`)
  });





  return {
    addReview: addReviewMutation,
    getReviews: getReviewsMutation.mutate,
  };
};
