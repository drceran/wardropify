import { useState, useEffect } from 'react';

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

    return (
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
                </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default HatList;
