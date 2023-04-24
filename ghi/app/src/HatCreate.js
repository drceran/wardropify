import React, { useState, useEffect } from 'react';

function HatCreate() {
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [fabric, setFabric] = useState('');
    const [styleName, setStyleName] = useState('');
    const [color, setColor] = useState('');
    const [picture, setPicture] = useState('');


const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
        data.style_name= styleName;
        data.fabric = fabric;
        data.location = location.id;
        data.color = color;
        data.picture = picture;

        const locationId = location;
        const locationUrl = `http://localhost:8090/api/locations/${locationId}/hatdetails/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newLocation = await response.json();
            console.log(newLocation);

            setStyleName('');
            setFabric('');
            setLocation('');
            setColor('');
            setPicture('');
        }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/locations/';
        const response = await fetch (url);
        if (response.ok) {
            const data = await response.json()
            setLocations(data.locations)
            console.log("fetchdata", data.locations)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);


    function handleStyleName(event) {
        const value = event.target.value;
        setStyleName(value);
    }

    function handleFabric(event) {
        const value = event.target.value;
        setFabric(value);
    }

    function handleLocation(event) {
        const value = event.target.value;
        setLocation(value);
    }

    function handleColor(event) {
        const value = event.target.value;
        setColor(value);
    }

    function handlePicture(event) {
        const value =event.target.value;
        setPicture(value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add another hat</h1>
                    <form onSubmit={handleSubmit} id="create-presentation-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFabric} value={fabric} placeholder="Fabric" required type="text" id="fabric" className="form-control" />
                            <label htmlFor="fabric">Fabric</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleStyleName} value={styleName} placeholder="Style name" required type="text" id="style_name" className="form-control" />
                            <label htmlFor="style_name">Style name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleColor} value={color} placeholder="Color" required type="text" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePicture} value={picture} placeholder="Picture" required type="url" id="picture" className="form-control" />
                            <label htmlFor="picture">Picture</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleLocation} value={location} required name="location" className="form-control" id="location">
                                <option value="">Choose a location</option>
                                {locations.map((location) => {
                                return (
                                    <option key={location.id} value={location.id}>{location.closet_name}</option>
                                )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default HatCreate;
