import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import StyledLink from '../../layout/StyledLink';

interface ICardProps {
    id: number
    name: string
    games_count: number
    image: string
}

const StyledBox = styled.div`
    display: flex;
    justify-content: space-between;
`


 const StoreCard:React.FC<ICardProps> = ({id, name, games_count, image}) => {
  return (
    <Card sx={{ width: 345,border:"2px solid #870252" }}>
      <CardMedia
        sx={{ height: 180, backgroundPosition:"top" }}
        image={image}
      />
      <CardContent sx={{backgroundColor:"#870252"}} >
        <Typography gutterBottom variant="h5" component="div" color="white">
          {name}
        </Typography>
        <StyledBox>

            <Typography variant="body2" color="white">
            {games_count}
            </Typography>
        </StyledBox>
      </CardContent>
      <CardActions sx={{backgroundColor:"#740343"}}>
        <StyledLink sx={{padding:"10px 15px"}} fsize={16} title="Czytaj więcej" to={`/stores/${id}`}/>
      </CardActions>
    </Card>
  );
}

export default StoreCard