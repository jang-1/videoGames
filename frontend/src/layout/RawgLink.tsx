import { Typography } from '@mui/material'
import styled from 'styled-components'

const StyledRawgLink = styled.a`
    color:purple;

`

const RawgLink = () => {
  return (
    <Typography gutterBottom variant="h6" component="h6" color="white" fontSize={14}>
            Data taken from: <StyledRawgLink href={"https://www.rawg.io/"}>RAWG</StyledRawgLink>
    </Typography>
  )
}

export default RawgLink