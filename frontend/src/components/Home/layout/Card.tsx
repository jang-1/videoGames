import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CsGo from "../../../assets/csgo.jpg"
import ButtonComponent from '../../../layout/StyledButton';

interface ICardProps {
    title: string
    teaser:string
}


 const CardComponent:React.FC<ICardProps> = ({title, teaser}) => {
  return (
    <Card sx={{ maxWidth: 345,border:"2px solid #870252" }}>
      <CardMedia
        sx={{ height: 180 }}
        image={CsGo}
        title="green iguana"
      />
      <CardContent sx={{backgroundColor:"#870252"}} >
        <Typography gutterBottom variant="h5" component="div" color="white">
          {title}
        </Typography>
        <Typography variant="body2" color="white">
          {teaser}
        </Typography>
      </CardContent>
      <CardActions sx={{backgroundColor:"#740343"}}>
        <ButtonComponent title="Czytaj więcej"/>
      </CardActions>
    </Card>
  );
}

export default CardComponent