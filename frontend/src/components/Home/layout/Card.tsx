import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CsGo from "../../../assets/csgo.jpg"
import ButtonComponent from '../../../layout/StyledButton';
import StyledLink from '../../../layout/StyledLink';
import { getText } from '../../../lib/getText';

interface ICardProps {
    id:number
    title: string
    // teaser:string
    desc: string
    img: string
}


 const CardComponent:React.FC<ICardProps> = ({id, title, desc, img}) => {
  return (
    <Card sx={{ maxWidth: 345,width:"100%",border:"2px solid #870252", background:"#870252" }}>
      <CardMedia
        sx={{ height: 180 }}
        image={img}
        title="green iguana"
      />
      <CardContent sx={{backgroundColor:"#870252"}} >
        <Typography gutterBottom variant="h5" component="div" color="white">
          {title}
        </Typography>
        <Typography variant="body2" color="white" sx={{height:"50px"}}>
          {getText(desc?.substring(0, 100))} ...
        </Typography>
      </CardContent>
      <CardActions sx={{backgroundColor:"#740343"}}>
        <StyledLink to={`/${id}`} fsize={18} title="Read more"/>
      </CardActions>
    </Card>
  );
}

export default CardComponent