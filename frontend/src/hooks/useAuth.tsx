import { useMutation } from '@tanstack/react-query';
import { mainAxios } from '../api/axiosCreate';
import { Inputs } from '../context/authContext';

export const useAuth = () => {

  const registerMutation = useMutation({
    mutationFn: (formData) => mainAxios.post('/auth/register', formData)
  });

  const loginMutation = useMutation({
    mutationFn: (formData: Inputs) => mainAxios.post('/auth/login', formData)
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
