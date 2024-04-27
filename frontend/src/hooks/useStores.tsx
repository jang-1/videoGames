import { useQuery } from '@tanstack/react-query';
import axios, { API_KEY } from '../api/axiosCreate';



export const useStores = (id?: string, currentPage?:any) => {

    const { data: storeList, refetch, isLoading } = useQuery({
        queryKey: ['stores', currentPage],
        queryFn: () => axios.get(`/stores?${API_KEY}&page=${currentPage}&page_size=9`),
    });

    const stores = storeList?.data?.results;

    const { data: singleStore, refetch:refetchStore } = useQuery({
        queryKey: ['store', id], 
        queryFn: () => {
            return axios.get(`/stores/${id}?${API_KEY}`);
        },
        enabled: false, 
    });
    const store = singleStore?.data;



  return {
    stores,
    isLoading,
    refetch,
    store,
    refetchStore
    };
};
