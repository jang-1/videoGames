import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mainAxios } from '../api/axiosCreate';
import { useNavigate } from 'react-router-dom';

export const usePosts = (id?: string, currentPage?:any) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate()

  const addPostMutation = useMutation({
    mutationFn: (formData: any) => mainAxios.post('/posts', formData),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['posts'] });
    },
  });

  
  

  const fetchPosts = async (page: number) => {
    return mainAxios.get('/posts', { params: { page } });
};

const { data: fetchedPosts, refetch: refetchPosts } = useQuery({
  queryKey: ['posts', currentPage], 
  queryFn: () => fetchPosts(currentPage), 
  enabled: true
});
  
  const { data: singlePost, refetch } = useQuery({
    queryKey: ['post', id],
    queryFn: () => {
      return mainAxios.get(`/posts/${id}`);
    },
    enabled: false,
  });
  
  const updatePostMutation = useMutation({
    mutationFn: (formData: any) => mainAxios.put(`/posts/${id}`, formData),
    onSuccess: async () => {

      queryClient.refetchQueries({ queryKey: ['posts'] });
      refetch()
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: () => mainAxios.delete(`/posts/${id}`),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate("/")
    },
  });

  return {
    addPost: addPostMutation,
    fetchedPosts,
    singlePost,
    refetch,
    updatePostMutation,
    refetchPosts,
    fetchPosts,
    deletePostMutation
  };
};
