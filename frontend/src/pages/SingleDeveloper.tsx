import { Breadcrumbs, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import  { API_KEY, rawgAxios } from '../api/axiosCreate'
import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import RawgLink from '../layout/RawgLink'
import { useCreators } from '../hooks/useCreators'

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
    width: 100%;
    gap:20px;

`

const StyledImage = styled.img`
    object-fit: contain;
    width: 40vw;
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
    display: flex;
    align-items: center;
    row-gap:20px;
    column-gap: 30px;
`

const SingleDeveloper = () => {

    const {id} = useParams()

    const breadcrumbsRef = useRef(null);


    const {developer, refetchDeveloper} = useCreators(id)

    const { data: fetchedGames } = useQuery({
        queryKey: ['gamesDevelopers'],
        queryFn: () => {
          return rawgAxios.get(`/games?${API_KEY}&developers=${id}`);
        },
      });


      const filteredGames = fetchedGames?.data

    useEffect(() => {
        const fetchData = async () => {
          await refetchDeveloper();
          const { offsetTop }: any = breadcrumbsRef.current;
    
          window.requestAnimationFrame(() => {
            window.scrollTo(0, offsetTop - 100);
          });
        };
    
        fetchData();
      }, [id, refetchDeveloper]);

  return (
    <Container>
        <Breadcrumbs ref={breadcrumbsRef} aria-label="breadcrumb" sx={{color:"white"}}>
            <StyledLink  color="white" to="/gamedevs" >
                Developers
            </StyledLink>
            <Typography color="#da4ea2">{developer?.name}</Typography>
        </Breadcrumbs>
        <SectionWrapper>
            <StyledImage src={developer?.image_background} />
            <Typography sx={{fontSize:"40px"}} color="#da4ea2">{developer?.name}</Typography>
           
            <Right>
                <TextWrapper>
                    <Typography textAlign="justify" dangerouslySetInnerHTML={{ __html: developer?.description }}>
                    </Typography>
                </TextWrapper>

                <TextWrapper>
                    <Typography fontWeight="bold" color="#da4ea2">
                    Popular Games:
                    </Typography>
                    <TextWrapper>
                        {filteredGames?.results.slice(0,5).map((game:any) => (
                            <Typography key={game.id} >
                            {game.name}
                            </Typography>
                        ))}
                    </TextWrapper>
                </TextWrapper>

                <TextWrapper>
                    <Typography fontWeight="bold" color="#da4ea2">
                        Count:
                    </Typography>
                    <TextWrapper>
                        {developer?.games_count}
                    </TextWrapper>
                </TextWrapper>

            
            </Right>
        </SectionWrapper>
        <RawgLink/>
    </Container>
  )
}

export default SingleDeveloper