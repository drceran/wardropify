import React, { useEffect, useState } from 'react';


function ShoeList({ shoes }) {

    const [shoedetails, setShoes] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const url = "http://localhost:8080/api/shoes/";
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setShoes(data.shoes);
            }
        }
        fetchdata();
    }, []);

    const deleteShoe = async (pk) => {
        fetch(`http://localhost:8080/api/shoes/${pk}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            window.location.reload();
        })
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Picture</th>
                    <th>Manufacturer</th>
                    <th>Model name</th>
                    <th>Color</th>
                    <th>Closet</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {shoedetails?.map(shoedetail => {
                    return (
                        <tr key={shoedetail.pk}>
                            <td>
                                <img src={shoedetail.picture_url} padding="6px" float="left" max-width="10 px" max-height="10 px" className="img-fluid" />
                            </td>
                            <td>{shoedetail.manufacturer}</td>
                            <td>{shoedetail.model_name}</td>
                            <td>{shoedetail.color}</td>
                            <td>{shoedetail.bin.closet_name}</td>
                            <td><button onClick={() => deleteShoe(shoedetail.pk)}  type="button" className="btn btn-outline-danger">Delete me!</button></td>
                        </tr>
                    );
                })}</tbody>
        </table>
    );
}
export default ShoeList;
