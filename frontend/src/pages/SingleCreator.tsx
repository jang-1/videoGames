import { Breadcrumbs, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
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
    gap:20px;
    justify-content: center;
    align-items: center;
`

const StyledImage = styled.img`
    object-fit: contain;
    width: 20vw;
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

const SingleCreator = () => {

    const {id} = useParams()

    const breadcrumbsRef = useRef(null);

    const {creator, refetchCreator} = useCreators(id)


    useEffect(() => {
        const fetchData = async () => {
          await refetchCreator();
          const { offsetTop }: any = breadcrumbsRef.current;
    
          window.requestAnimationFrame(() => {
            window.scrollTo(0, offsetTop - 100);
          });
        };
    
        fetchData();
      }, [id, refetchCreator]);

  return (
    <Container>
        <Breadcrumbs ref={breadcrumbsRef} aria-label="breadcrumb" sx={{color:"white"}}>
            <StyledLink  color="white" to="/gamedevs" >
                Creators
            </StyledLink>
            <Typography color="#da4ea2">{creator?.name}</Typography>
        </Breadcrumbs>
        <SectionWrapper>
            <StyledImage src={creator?.image} />
            <Typography sx={{fontSize:"40px"}} color="#da4ea2">{creator?.name}</Typography>
            <Right>
                <TextWrapper>
                    <Typography textAlign="justify" dangerouslySetInnerHTML={{ __html: creator?.description }}>
                    </Typography>
                </TextWrapper>

                <TextWrapper>
                    <Typography fontWeight="bold" color="#da4ea2">
                        Positions:
                    </Typography>
                    {creator?.positions.map((p:any) =>(
                                <Typography>{p.name}</Typography>
                    ))}
                </TextWrapper>


                <TextWrapper>
                    <Typography fontWeight="bold" color="#da4ea2">
                        Creator rating:
                    </Typography>
                    <Typography>
                        {creator?.rating}
                    </Typography>

                </TextWrapper>
                
                <TextWrapper>
                    <Typography fontWeight="bold" color="#da4ea2">
                        Games count per platform:
                    </Typography>
                    {creator?.platforms.results.map((p:any) =>(
                            <div>

                                <Typography>{p.platform.name}</Typography>
                                <Typography>{p.count}</Typography>
                            </div>
                    ))}
                </TextWrapper>
            </Right>
        </SectionWrapper>
        <RawgLink/>
    </Container>
  )
}

export default SingleCreator