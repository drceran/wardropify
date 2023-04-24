import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function HatList() {

    const [hatdetails, setHats] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const url = "http://localhost:8090/api/hatdetails";
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setHats(data.hatdetails);
            }
        }
        fetchdata();
}, []);

const handleDeleteHat = async (id) => {
    const hatURL = `http://localhost:8090/api/hatdetails/${id}`;
    const fetchConfig = {
        method: 'delete',
    }
    const response = await fetch(hatURL, fetchConfig);
    if (response.ok) {
        setHats(hatdetails.filter((hat) => hat.id));

    }
    document.location.reload();
};

    return (
    <>
    <Link to="/hats/new">
            <button type="button" className="btn btn-outline-primary">Add a new hat</button>
        </Link>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>fabric</th>
                <th>style name</th>
                <th>color</th>
                <th>picture</th>
                <th>location</th>
            </tr>
            </thead>
            <tbody>
            {hatdetails.map(hatdetail => {
                return (
                <tr key={hatdetail.id}>
                    <td>{ hatdetail.fabric }</td>
                    <td>{ hatdetail.style_name }</td>
                    <td>{ hatdetail.color }</td>
                    <td>
                    <img src={hatdetail.picture}/>
                    </td>
                    <td>{ hatdetail.location.closet_name }</td>
                    <td>
                        <button onClick={() => handleDeleteHat(hatdetail.id)} className="btn btn-lg btn-primary" >Delete Hat </button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
    </>
    );
}

export default HatList;
