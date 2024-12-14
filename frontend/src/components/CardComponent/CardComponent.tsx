import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import StyledLink from '../../layout/StyledLink';
import { getText } from '../../lib/getText';

interface ICardProps {
  id: number;
  name?: string;
  title?: string;
  desc?: string; 
  image: string; 
  games_count?: number; 
  release?: string; 
  rating?: number; 
  linkBasePath: string; 
}

const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardComponent: React.FC<ICardProps> = ({
  id,
  name,
  title,
  desc,
  image,
  games_count,
  release,
  rating,
  linkBasePath,
}) => {
  return (
    <Card sx={{ maxWidth: 345, width: '100%', border: '2px solid #870252', background: '#870252' }}>
      <CardMedia sx={{ height: 180, backgroundPosition: 'top' }} image={image} />
      <CardContent sx={{ backgroundColor: '#870252' }}>
        <Typography gutterBottom variant="h5" component="div" color="white">
          {name || title}
        </Typography>

        {desc && (
          <Typography variant="body2" color="white" sx={{ height: '50px' }}>
             {getText(desc?.substring(0, 100))} {desc.length > 100 && "..."}
          </Typography>
        )}
        <StyledBox>
          {games_count !== undefined && (
            <Typography variant="body2" color="white">
              Games count: {games_count}
            </Typography>
          )}
          {release && (
            <Typography variant="body2" color="white">
              Release date: {release}
            </Typography>
          )}
          {rating !== undefined && (
            <Typography variant="body2" color="white">
              Rating: {rating}
            </Typography>
          )}
        </StyledBox>
      </CardContent>
      <CardActions sx={{ backgroundColor: '#740343' }}>
        <StyledLink sx={{ padding: '10px 15px' }} fsize={16} title="Read More" to={linkBasePath === "" ? `/${id}` : `/${linkBasePath}/${id}`} />
      </CardActions>
    </Card>
  );
};

export default CardComponent;
