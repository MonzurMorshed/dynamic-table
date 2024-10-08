import { useEffect, useState } from "react";
import { GetList } from "../APIRequest/APIRequest";
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { TbDirection, TbSearch } from "react-icons/tb";
import { MdOutlineCloudDownload } from "react-icons/md";
import { usePDF } from "react-to-pdf";

const List = () => {

    const [searchKeyword, setSearchKeyword] = useState("0");
    const [perPage, setPerPage] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [sortVal, setSortVal] = useState(1);

    useEffect(() => {
        GetList(1, perPage, searchKeyword,'_id',sortVal);
    }, []);

    const itemList = useSelector((state) => (state.list.ListItem));
    const itemCount = useSelector((state) => (state.list.Total));

    const handlePageClick = (event) => {
        setPageNo(event.selected);
        GetList(pageNo + 1, perPage, searchKeyword,'_id',sortVal);
    }

    const perPageChange = (event) => {
        setPerPage(event.target.value);
        GetList(1, parseInt(event.target.value), searchKeyword,'_id',sortVal);
    }

    const searchKeywordOnChange = (event) => {

        setSearchKeyword(event.target.value);
        if ((event.target.value)?.length === 0) {
            setSearchKeyword("0");
            GetList(1, perPage, searchKeyword,'_id',sortVal);
        }
    }

    const searchData = () => {
        GetList(1, perPage, searchKeyword,sortVal);
    }

    const handleRequestSort = (key) => {
        sortVal == 1 ? setSortVal(-1) : setSortVal(1);
        GetList(1, perPage, searchKeyword,key,sortVal);
    };

    const { toPDF, targetRef } = usePDF({filename: 'data.pdf'});

    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card ">
                            <div className="card-body">
                                <div className="container-fluid ">
                                    <div className="row my-2 justify-content-between">
                                        <div className="col-md-4 col-sm-4 d-flex items-center mb-2">
                                            <img className="w-15 sm-w-5 h-5" src="./src/assets/images/database-table.webp" alt="data-table" />
                                            <h4 className="list-heading mx-4">Data List</h4>
                                        </div>
                                        <div className="col-4">
                                            <button onClick={() => toPDF()} className="btn btn-sm btn-success float-end"><MdOutlineCloudDownload className="fs-2 fw-600 mr-2"/></button>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-2 col-sm-2  mb-2 float-end">
                                            <select onChange={perPageChange} className="form-control p-1 form-control-sm">
                                                <option value="10">10 per page</option>
                                                <option value="20">20 per page</option>
                                                <option value="30">30 per page</option>
                                                <option value="40">40 per page</option>
                                                <option value="50">50 per page</option>
                                                <option value="60">60 per page</option>
                                                <option value="70">70 per page</option>
                                            </select>
                                        </div>
                                        <div className="col-md-5  col-sm-5 mb-2 float-end">
                                            <div className="input-group mb-3">
                                                <input onChange={searchKeywordOnChange} type="text" className="form-control form-control-sm" placeholder="Search.." />
                                                <button onClick={searchData} className="btn search-btn btn-sm mb-0"><TbSearch className="fw-600 mr-2"/></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12" ref={targetRef}>
                                            <div className="table-responsive data-table">
                                                <table className="table table-striped table-hover list-table">
                                                    <thead className="sticky-top">
                                                        <tr>
                                                            <th>No. </th>
                                                            <th className="cursor-pointer" onClick={() => handleRequestSort('name')}>
                                                                Name <TbDirection className="fs-3" />
                                                            </th>
                                                            <th className="cursor-pointer" onClick={() => handleRequestSort('address')}>
                                                                Address <TbDirection className="fs-3" />
                                                            </th>
                                                            <th className="cursor-pointer" onClick={() => handleRequestSort('cuisine')}>
                                                                Cuisine <TbDirection className="fs-3" />
                                                            </th>
                                                            <th className="cursor-pointer" onClick={() => handleRequestSort('borough')}>
                                                                Borough <TbDirection className="fs-3" />
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            itemList?.map((item, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="text-center">{parseInt(pageNo * perPage) + parseInt(index + 1)}</td>
                                                                        <td>{item?.name}</td>
                                                                        <td>{`House : ${item?.address?.building}, Street : ${item?.address?.street}`}</td>
                                                                        <td>{item?.cuisine}</td>
                                                                        <td>{item?.borough}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5 paginationdata">
                                            <nav aria-label="Page Navigation">
                                                <ReactPaginate
                                                    breakLabel="......"
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    nextLabel=">"
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"

                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"

                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"

                                                    onPageChange={handlePageClick}
                                                    pageRangeDisplayed={5}
                                                    pageCount={itemCount / perPage}
                                                    marginPagesDisplayed={2}
                                                    previousLabel="<"
                                                    renderOnZeroPageCount={null}
                                                    containerClassName="pagination"
                                                    activeClassName="active"
                                                />
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List;