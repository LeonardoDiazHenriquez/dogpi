import styles from './pagination.module.css';
const Pagination = ({ total, size, actualPage, onPageChange }) => {
    if(total === 0) {
        return (<></>);
    }
    const totalPages = Math.ceil(total / size);
    const pages = [];
    for(let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return <div className={styles.center}>
        <div className={styles.pagination}>
        {(actualPage != 1)?<a href="#" onClick={(e) => {onPageChange(actualPage-1)}}>&laquo;</a>:<></>}
        
        {pages.map(page => {
            if(page === actualPage) {
                return <a className={styles.active} key={page}>{page}</a>;
            } 
            return <a key={page} href="#" onClick={(e) => {
                onPageChange(parseInt(e.target.innerText));
            }}>{page}</a>;
        })}
        {(actualPage != totalPages)?<a href="#" onClick={(e) => {onPageChange(actualPage+1)}}>&raquo;</a>:<></>}
          
        </div>
    </div>;
};

export default Pagination;