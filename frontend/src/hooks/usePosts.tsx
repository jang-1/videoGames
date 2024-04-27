import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '../api/axiosCreate';



export const usePosts = (id?: string) => {

  const addPostMutation = useMutation({
    mutationFn: (formData:any) => axios.post('http://localhost:3000/api/posts', formData)
  });

 const getPosts = () => {
    return axios.get('http://localhost:3000/api/posts');
 }

 const { data: fetchedPosts } = useQuery({
  queryKey: ['posts'],
  queryFn: () =>  getPosts()

});

const { data: singlePost, refetch} = useQuery({
  queryKey: ['post', id],
  queryFn: () => {
      return axios.get(`http://localhost:3000/api/posts/${id}`)
  },
  enabled: false,
});



  return {
    addPost: addPostMutation,
    fetchedPosts,
    singlePost,
    refetch
    };
};
