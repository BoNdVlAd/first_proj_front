import {styled} from "styled-components";


interface Pagination {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
}

interface PaginationControlsProps {
    pagination: Pagination;
    onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ pagination, onPageChange }) => {
    const { currentPage, lastPage } = pagination;

    return (
        <div>
            <ButtonArrow
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {'<'}
            </ButtonArrow>
            <span>
                page {currentPage} of {lastPage}
            </span>
            <ButtonArrow
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
            >
                {'>'}
            </ButtonArrow>
        </div>
    );
};

export default PaginationControls;


const ButtonArrow = styled.button`
    width: 3rem;
    height: 3rem;
    background: aliceblue;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    font-size: 30px;

    &:hover {
        color: #224870;
        background: #cbdafa;
    }

`
