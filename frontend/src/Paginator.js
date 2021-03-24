import { useEffect } from "react";
import "./styles/Paginator.css"

const Paginator = ({ itemsToPaginate, paginatedItems, setPaginatedItems, page, setPage }) => {
  useEffect(() => {
    const paginate = () => {
      const totalPages = [];
      let currentPage = [];
      for (let i = 0; i < itemsToPaginate.length; i++) {
        if (i % 10 === 0 && i !== 0) {
          totalPages.push(currentPage);
          currentPage = [];
        }
        currentPage.push(itemsToPaginate[i]);
      }
      totalPages.push(currentPage);
      setPaginatedItems(current => totalPages);
      setPage(1);
    }

    paginate();

  }, [itemsToPaginate, setPage, setPaginatedItems])

  const updatePage = (newPage) => {
    if (!(newPage > paginatedItems.length || newPage < 1)) {
      setPage(page => newPage);
    }
  }

  return (
    <>
      <div className="Paginator">
        <button onClick={() => updatePage(1)}>1</button>
        <button onClick={() => updatePage(page - 1)}>&#8592;</button>
        <button className="active">{page}</button>
        <button onClick={() => updatePage(page + 1)}>&#8594;</button>
        <button onClick={() => updatePage(paginatedItems.length)}>{paginatedItems.length}</button>
      </div>
    </>
  )

}

export default Paginator;