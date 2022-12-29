import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Pagination from "react-js-pagination";
import socketClient from 'socket.io-client';
const itemsCountPerPage = 10;
const socketURL = 'http://localhost:9000';
const socket = socketClient(socketURL);

const MyPagination = () => {

    const [activePage, setActivePage] = useState(1);
    const [itemList, setItemList] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const sortBy = useRef('name');
    const sortOrder = useRef(1);

    useEffect(() => {
        getItems(0);
        socket.on('item-updated', updatedItem => {
            setItemList(prevVal => {
                let itemListCopy = Object.assign([], prevVal);
                const foundIndex = prevVal.findIndex(item => item._id === updatedItem._id);
                if (foundIndex > -1) {
                    itemListCopy[foundIndex] = updatedItem;
                }
                return itemListCopy;
            });
        });
        socket.on('item-deleted', updatedItem => {
            setItemList(prevVal => {
                let itemListCopy = Object.assign([], prevVal);
                const foundIndex = prevVal.findIndex(item => item._id === updatedItem._id);
                if (foundIndex > -1) {
                    itemListCopy[foundIndex] = updatedItem;
                }
                return itemListCopy;
            });
        });
        socket.on('item-added', updatedItem => {
            setItemList(prevVal => {
                let itemListCopy = Object.assign([], prevVal);
                const foundIndex = prevVal.findIndex(item => item._id === updatedItem._id);
                if (foundIndex > -1) {
                    itemListCopy[foundIndex] = updatedItem;
                }
                return itemListCopy;
            });
        });
    }, [])

    const handlePageChange = (currentPage) => {
        console.log('Current Page Number: ', currentPage);
        setActivePage(currentPage);
        getItems((currentPage - 1) * itemsCountPerPage);
    }

    const getItems = (skip) => {
        axios.get(`http://127.0.0.1:8080/items?skip=${skip}&limit=${itemsCountPerPage}&sortOrder=${sortOrder.current}&sortBy=${sortBy.current}`).then(res => {
            if (res.status === 200 && res.data && res.data.itemList && res.data.itemList.length && res.data.totalItems) {
                setItemList(res.data.itemList);
                setTotalItems(res.data.totalItems);
            }
        })
    }

    return (
        <>
            <div>
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th onClick={() => {
                                sortBy.current = 'size';
                                sortOrder.current = sortOrder.current === -1 ? 1 : -1;
                                getItems((activePage - 1) * itemsCountPerPage);
                            }} scope="col">Size</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itemList.map(item => {
                                return (
                                    <tr >
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.size}</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItems}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />
            </div>
        </>
    )
}

// explanation
// no of pages = total no of records / no of records per page
// limit = itemsCountPerPage
// skip = initial(page=1)=activePage(1)-1 = 0*itemsCountPerPage=0 || page(2)=activePage(2)-1 = 1*itemsCountPerPage=10 || page(3)=activePage(3)-1 = 2*itemsCountPerPage=20

export default MyPagination;