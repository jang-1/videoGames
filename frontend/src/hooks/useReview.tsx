import { useMutation, useQuery } from '@tanstack/react-query';
import {mainAxios} from '../api/axiosCreate';

type FormData = {
  userId?: number,
  gameId?: string,
  review: string,
  title: string
}

type Review = {
  createdAt: string
  game_id: number
  id: number
  review_text: string
  title: string
  updatedAt: string | null
  user_email: string
  user_id: number
  user_name: string
}

export const useReview = (id?: string) => {

  const addReviewMutation = useMutation({
    mutationFn: (formData:FormData) => mainAxios.post('/reviews/addReview', formData)
  });

  const editReviewMutation = useMutation({
    mutationFn: (formData:any) => mainAxios.put(`/reviews/${formData.reviewId}`, formData)
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
  let reviews: Review[] | [] = fetchedReviews?.data;
  reviews =  reviews?.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });


  return {
    addReview: addReviewMutation,
    reviews,
    refetchReviews,
    editReviewMutation,
    deleteReviewMutation
  };
};
