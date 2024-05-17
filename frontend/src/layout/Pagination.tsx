import StyledButton from './StyledButton'
import styled from 'styled-components'

type Pagination = {
    currentPage: number
    hasMorePages: boolean
    prevPage: () => void
    nextPage: () => void
}

const ButtonWrapper = styled.div`
    width: 100%;
    align-self: flex-end;
    display: flex;
    justify-content: center;
    gap:150px;
    margin: 50px 0;

    @media (max-width: 768px) {
        width:100%;
  }
`;

const Pagination = ({currentPage, hasMorePages, prevPage, nextPage}:Pagination) => {
  return (
    <ButtonWrapper>
         <StyledButton disabled={currentPage > 1 ? false : true} onClick={prevPage} title="Previous" />
         <StyledButton disabled={hasMorePages ? false : true} onClick={nextPage} title="Next" />
    </ButtonWrapper>
  )
}

export default Pagination