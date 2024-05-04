import { useQuery } from '@tanstack/react-query';
import { API_KEY, rawgAxios } from '../api/axiosCreate';



export const useGames = (id?: string, currentPage?:number, selectedGenre?: string) => {

    const { data: genresList } = useQuery({
        queryKey: ['genres'],
        queryFn: () => rawgAxios.get(`/genres?${API_KEY}`),
    });
    const genres = genresList?.data.results;

    const { data: gameList, isLoading, refetch } = useQuery({
        queryKey: ['games', currentPage, selectedGenre], 
        queryFn: () => {
            const genreQuery = selectedGenre ? `&genres=${selectedGenre}` : '';
            return rawgAxios.get(`/games?${API_KEY}&page=${currentPage}&page_size=9${genreQuery}`);
        },
        enabled: !id
    });
    const games = gameList?.data.results;

    const { data: singleGame, refetch:refetchSingleGame } = useQuery({
        queryKey: ['game', id],
        queryFn: () => {
            return rawgAxios.get(`/games/${id}?${API_KEY}`);
        },
        enabled: false,
    });
    const game = singleGame?.data;



  return {
    genres,
    games,
    isLoading,
    refetch,
    game,
    refetchSingleGame
    };
};
