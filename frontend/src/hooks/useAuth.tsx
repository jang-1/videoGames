import { useMutation } from '@tanstack/react-query';
import axios from '../api/axiosCreate';

export const useAuth = () => {

  const registerMutation = useMutation({
    mutationFn: (formData) => axios.post('http://localhost:3000/api/auth/register', formData)
  });

  const loginMutation = useMutation({
    mutationFn: (formData) => axios.post('http://localhost:3000/api/auth/login', formData)
  });

  const logoutMutation = useMutation({
    mutationFn: () => axios.post('http://localhost:3000/api/auth/logout')
  });




  return {
    registerUser: registerMutation.mutate,
    login: loginMutation,
    logout: logoutMutation,

  };
};