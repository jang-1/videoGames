import { useMutation } from '@tanstack/react-query';
import { mainAxios } from '../api/axiosCreate';

export const useAuth = () => {

  const registerMutation = useMutation({
    mutationFn: (formData) => mainAxios.post('/auth/register', formData)
  });

  const loginMutation = useMutation({
    mutationFn: (formData) => mainAxios.post('/auth/login', formData)
  });

  const logoutMutation = useMutation({
    mutationFn: () => mainAxios.post('/auth/logout')
  });




  return {
    registerUser: registerMutation.mutate,
    login: loginMutation,
    logout: logoutMutation,

  };
};
