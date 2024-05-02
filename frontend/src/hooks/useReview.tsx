import { useMutation, useQuery } from '@tanstack/react-query';
import {mainAxios} from '../api/axiosCreate';

export const useReview = (id?: any) => {

  const addReviewMutation = useMutation({
    mutationFn: (formData:any) => mainAxios.post('/reviews/addReview', formData)
  });

  const editReviewMutation = useMutation({
    mutationFn: (formData:any) => mainAxios.put(`/reviews/${formData.id}`, formData)
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId:number) => mainAxios.delete(`/reviews/${reviewId}`)
  });


  
    const { data: fetchedReviews, refetch: refetchReviews } = useQuery({
      queryKey: ['reviews', id],
      queryFn: () => {
          return mainAxios.get(`/reviews/${id}`);
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
