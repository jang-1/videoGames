import { Breadcrumbs, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import axios, { API_KEY } from '../api/axiosCreate'
import styled from 'styled-components'

const StyledLink = styled(Link) `
    color:white;

    &:hover {
        color:#da4ea2;
    }
`

const Container = styled.div`
    width: 70%;
    display: flex;
    margin: 0px auto 150px;
    row-gap: 30px;
    flex-direction: column;
 
`


const Right = styled.div`
    display: flex;
    flex-direction: column;
    flex:2;
    gap:20px;
    justify-content: center;
    align-items: center;
`

const StyledImage = styled.img`
    object-fit: contain;
    width: 80%;
    border-radius: 30px;
`

const SectionWrapper = styled.div`
    width: 100%;
    display: flex;
    gap:30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TextWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    row-gap:20px;
    column-gap: 30px;
`

const SingleGame = () => {

    const {id} = useParams()
    console.log(id)

    const { data: singleGame } = useQuery({
        queryKey: ['game', id], 
        queryFn: () => {
            return axios.get(`/games/${id}?${API_KEY}`);
        },
    });
    const game = singleGame?.data;
    console.log(singleGame)
    console.log(game)



  return (
    <Container>
        <Typography sx={{fontSize:"40px"}} >{game?.name}</Typography>
        <Breadcrumbs aria-label="breadcrumb" sx={{color:"white"}}>
            <StyledLink  color="white" to="/games" >
                Games
            </StyledLink>
            <Typography color="#da4ea2">{game?.name}</Typography>
        </Breadcrumbs>
        <SectionWrapper>

           
                <StyledImage src={game?.background_image} />
           
            <Right>
                <TextWrapper>
                    <Typography textAlign="justify">
                        {game?.description_raw}
                    </Typography>
                </TextWrapper>

                <TextWrapper>
                    <Typography fontWeight="bold" color="#da4ea2">
                        Relased:
                    </Typography>
                    <TextWrapper>
                        {game?.released}
                    </TextWrapper>
                </TextWrapper>

                <TextWrapper>
                    <Typography fontWeight="bold" color="#da4ea2">
                        Platforms:
                    </Typography>
                    <TextWrapper>
                        {game?.platforms.map((p:any) =>(
                            <Typography>
                                {p.platform.name}
                            </Typography>
                        ))}
                    </TextWrapper>
                </TextWrapper>

                <TextWrapper>
                    <Typography fontWeight="bold" color="#da4ea2">
                        Stores:
                    </Typography>
                    <TextWrapper>
                        {game?.stores.map((s:any) =>(
                            <Typography>
                                {s.store.name}
                            </Typography>
                        ))}
                    </TextWrapper>
                </TextWrapper>

                <TextWrapper>
                    <Typography fontWeight="bold" color="#da4ea2">
                        Genres:
                    </Typography>
                    <TextWrapper>
                        {game?.genres.map((g:any) =>(
                            <Typography>
                                {g.name}
                            </Typography>
                        ))}
                    </TextWrapper>
                </TextWrapper>
                <TextWrapper>
                    <Typography fontWeight="bold" color="#da4ea2">
                        Developers:
                    </Typography>
                    <TextWrapper>
                        {game?.developers.map((d:any) =>(
                            <Typography>
                                {d.name}
                            </Typography>
                        ))}
                    </TextWrapper>
                </TextWrapper>

                <TextWrapper>
                    <Typography fontWeight="bold" color="#da4ea2">
                        Rating:
                    </Typography>
                    <TextWrapper>
                        {game?.rating}
                    </TextWrapper>
                </TextWrapper>
            </Right>
        </SectionWrapper>
    </Container>
  )
}

export default SingleGame