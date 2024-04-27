import { useQuery } from '@tanstack/react-query';
import axios, { API_KEY } from '../api/axiosCreate';



export const useCreators = (id?: string, currentPage?:any, currentCreatorPage?: any) => {

    const { data: gameDevsList, refetch, isLoading } = useQuery({
        queryKey: ['gameDevs', currentPage], 
        queryFn: () => {
            return axios.get(`/developers?${API_KEY}&page=${currentPage}&page_size=9`);
        },
    });
    console.log(gameDevsList)
    const gameDevs = gameDevsList?.data.results;
  
  
    const { data:gameCreatorsList, refetch:refetchCreators, isLoading:isLoadingCreators } = useQuery({
      queryKey: ['gameCreators', currentCreatorPage],
      queryFn: () => axios.get(`/creators?${API_KEY}&page=${currentCreatorPage}&page_size=9`),
    })
  
    const gameCreators = gameCreatorsList?.data?.results

    
    const { data: singleCreator, refetch: refetchCreator } = useQuery({
        queryKey: ['creator', id], 
        queryFn: () => {
            return axios.get(`/creators/${id}?${API_KEY}`);
        },
        enabled: false,
    });
    const creator = singleCreator?.data;

    const { data: singleDeveloper, refetch:refetchDeveloper } = useQuery({
        queryKey: ['developer', id], 
        queryFn: () => {
            return axios.get(`/developers/${id}?${API_KEY}`);
        },
        enabled: false, 
    });
    const developer = singleDeveloper?.data;

  return {
    gameDevs,
    gameCreators,
    isLoading,
    refetch,
    isLoadingCreators,
    refetchCreators,
    creator,
    refetchCreator,
    developer,
    refetchDeveloper
    };
};
