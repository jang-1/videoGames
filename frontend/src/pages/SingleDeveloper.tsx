import { Breadcrumbs, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import axios, { API_KEY } from '../api/axiosCreate'
import styled from 'styled-components'
import { useEffect, useRef } from 'react'

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
    width: 100%;
    display: flex;
    align-items: center;
    row-gap:20px;
    column-gap: 30px;
`

const SingleDeveloper = () => {

    const {id} = useParams()

    const titleRef = useRef(null);

    const { data: singleDeveloper, refetch } = useQuery({
        queryKey: ['developer', id], 
        queryFn: () => {
            return axios.get(`/developers/${id}?${API_KEY}`);
        },
        enabled: false, // Set enabled to false
    });
    const developer = singleDeveloper?.data;
    console.log(singleDeveloper)
    console.log(developer)

    useEffect(() => {
        const fetchData = async () => {
          await refetch();
          const { offsetTop }: any = titleRef.current;
    
          window.requestAnimationFrame(() => {
            window.scrollTo(0, offsetTop);
          });
        };
    
        fetchData();
      }, [id, refetch]);

  return (
    <Container>
        <Typography ref={titleRef} sx={{fontSize:"40px"}} >{developer?.name}</Typography>
        <Breadcrumbs aria-label="breadcrumb" sx={{color:"white"}}>
            <StyledLink  color="white" to="/gamedevs" >
                Developers
            </StyledLink>
            <Typography color="#da4ea2">{developer?.name}</Typography>
        </Breadcrumbs>
        <SectionWrapper>
            <StyledImage src={developer?.image_background} />
           
            <Right>
                <TextWrapper>
                    <Typography textAlign="justify" dangerouslySetInnerHTML={{ __html: developer?.description }}>
                    </Typography>
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
    </Container>
  )
}

export default SingleDeveloper