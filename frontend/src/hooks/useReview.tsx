import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '../api/axiosCreate';

export const useReview = (id?: any) => {

  const addReviewMutation = useMutation({
    mutationFn: (formData:any) => axios.post('http://localhost:3000/api/reviews/addReview', formData)
  });

  const editReviewMutation = useMutation({
    mutationFn: (formData:any) => axios.put(`http://localhost:3000/api/reviews/${formData.id}`, formData)
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId:any) => axios.delete(`http://localhost:3000/api/reviews/${reviewId}`)
  });


  
    const { data: fetchedReviews, refetch: refetchReviews } = useQuery({
      queryKey: ['reviews', id],
      queryFn: () => {
          return axios.get(`http://localhost:3000/api/reviews/${id}`);
      },
      enabled: true,
  });
  const reviews = fetchedReviews?.data;





  return {
    addReview: addReviewMutation,
    reviews,
    refetchReviews,
    editReviewMutation,
    deleteReviewMutation
  };
};
