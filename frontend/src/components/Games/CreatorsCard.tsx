import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import StyledLink from '../../layout/StyledLink';

interface ICardProps {
    id: number
    name: string
    games_count:string
    image: string
}

const StyledBox = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`

const StyledImage = styled.img`
    border-radius: 50%;
    background-position: center;
    object-fit: cover; 
    height: 180px;
    width: 180px;
    position: absolute;
    left:50%;
    transform: translate(-50%, -50%);
    border: 3px solid white;
`

const Container = styled.div`
    width:345px;
    min-height:345px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background-color:#870252;
    border: 2px solid #870252;
`

const ImageWrapper = styled.div`
    height: 100px;
    width: 100%;
    border-radius: 20px;
    display: flex;
    flex:6;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
`


 const CreatorsCard:React.FC<ICardProps> = ({id, name, games_count, image}) => {
  return (
    <Container>
        <ImageWrapper>
            <StyledImage src={image}/>
        </ImageWrapper>
      <CardContent sx={{backgroundColor:"#870252", display:"flex", flexDirection:"column", flex:3}} >
        <Typography gutterBottom variant="h5" component="div" color="white">
          {name}
        </Typography>
        <StyledBox>
           <Typography>Games Count: {games_count}</Typography>
        </StyledBox>
      </CardContent>
      <CardActions sx={{backgroundColor:"#740343", borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px", width:"100%", display:"flex", flex:1}}>
        <StyledLink sx={{padding:"10px 15px"}} fsize={16} title="Czytaj więcej" to={`/creators/${id}`}/>
      </CardActions>
    </Container>
  );
}

export default CreatorsCard