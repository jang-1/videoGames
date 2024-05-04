import { useQuery } from '@tanstack/react-query';
import { API_KEY, rawgAxios } from '../api/axiosCreate';



export const useStores = (id?: string, currentPage?:number) => {

    const { data: storeList, refetch, isLoading } = useQuery({
        queryKey: ['stores', currentPage],
        queryFn: () => rawgAxios.get(`/stores?${API_KEY}&page=${currentPage}&page_size=9`),
        enabled:!id
    });

    const stores = storeList?.data?.results;

    const { data: singleStore, refetch:refetchStore } = useQuery({
        queryKey: ['store', id], 
        queryFn: () => {
            return rawgAxios.get(`/stores/${id}?${API_KEY}`);
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
