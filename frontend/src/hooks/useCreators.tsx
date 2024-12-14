import { useQuery } from '@tanstack/react-query';
import { API_KEY, rawgAxios } from '../api/axiosCreate';



export const useCreators = (id?: string, currentPage?:number, currentCreatorPage?: number) => {

    const { data: gameDevsList, refetch, isLoading } = useQuery({
        queryKey: ['gameDevs', currentPage], 
        queryFn: () => {
            return rawgAxios.get(`/developers?${API_KEY}&page=${currentPage}&page_size=9`);
        },
        enabled: !id
    });
    const gameDevs = gameDevsList?.data.results;
  
  
    const { data:gameCreatorsList, refetch:refetchCreators, isLoading:isLoadingCreators } = useQuery({
      queryKey: ['gameCreators', currentCreatorPage],
      queryFn: () => rawgAxios.get(`/creators?${API_KEY}&page=${currentCreatorPage}&page_size=9`),
      enabled: !id
    })
  
    const gameCreators = gameCreatorsList?.data?.results

    
    const { data: singleCreator, refetch: refetchCreator } = useQuery({
        queryKey: ['creator', id], 
        queryFn: () => {
            return rawgAxios.get(`/creators/${id}?${API_KEY}`);
        },
        enabled: false,
    });
    const creator = singleCreator?.data;

    const { data: singleDeveloper, refetch:refetchDeveloper } = useQuery({
        queryKey: ['developer', id], 
        queryFn: () => {
            return rawgAxios.get(`/developers/${id}?${API_KEY}`);
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
