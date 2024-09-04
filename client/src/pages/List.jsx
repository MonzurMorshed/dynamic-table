import { useEffect, useState } from "react";
import { GetList } from "../APIRequest/APIRequest";
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

const List = () => {

    let [searchKeyword,setSearchKeyword] = useState("0");
    let [perPage,setPerPage] = useState(10);

    useEffect(() => {
        GetList(1,perPage,searchKeyword);
    },[]);

    let itemList = useSelector((state) => (state.list.ListItem));
    let itemCount = useSelector((state) => (state.list.Total));

    const handlePageClick = (event) => {
        let pageNo = event.selected;
        GetList(pageNo+1,perPage,searchKeyword);
    }

    const perPageChange = (event) => {
        GetList(1,parseInt(event.target.value),searchKeyword);
    }

    const searchKeywordOnChange = (event) => {

        setSearchKeyword(event.target.value);
        if((event.target.value)?.length === 0){
            setSearchKeyword("0");
            GetList(1,perPage,searchKeyword);
        } else {
            GetList(1,perPage,searchKeyword);
        }
    }

    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card ">
                            <div className="card-body">
                                <div className="container-fluid ">
                                    <div className="row my-2">
                                        <div className="col-6 d-flex items-center">
                                            <img className="w-10" src="./src/assets/images/database-table.webp" alt="data-table" />
                                            <h4 className="list-heading mx-4">Data List</h4>
                                        </div>
                                        <div className="col-2">
                                            <select onChange={perPageChange} className="form-control p-1 form-control-sm">
                                                <option value="5">5 per page</option>
                                                <option value="10">10 per page</option>
                                                <option value="20">20 per page</option>
                                                <option value="30">30 per page</option>
                                                <option value="40">40 per page</option>
                                                <option value="50">50 per page</option>
                                                <option value="60">60 per page</option>
                                                <option value="70">70 per page</option>
                                                <option value="15">80 per page</option>
                                                <option value="15">90 per page</option>
                                                <option value="15">100 per page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input onChange={searchKeywordOnChange} type="text" className="form-control form-control-sm" placeholder="Search.."/>
                                                <button className="btn btn-outline-primary btn-sm mb-0">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive data-table">
                                                <table className="table list-table">
                                                    <thead className="sticky-top">
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Name</th>
                                                            <th>Address</th>
                                                            <th>Cuisine</th>
                                                            <th>Borough</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        itemList?.map((item,index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <th className="text-center">{index+1}</th>
                                                                    <th>{item?.name}</th>
                                                                    <th>{`House : ${item?.address?.building}, Street : ${item?.address?.street}`}</th>
                                                                    <th>{item?.cuisine}</th>
                                                                    <th>{item?.borough}</th>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5">
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
                                                pageCount={itemCount/perPage}
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