import React, { useEffect, useState } from 'react';

function ShoeCreate(props) {
    const [formData, setFormData] = useState({
        manufacturer: '',
        model_name: '',
        color: '',
        bin: '',
        picture_url: '',
    })
    const [bins, setBins] = useState([]);

    // get bin list.
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/bins/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setBins(data.bins);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': "application/json",
            },
        };
        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            setFormData({
                manufacturer: '',
                model_name: '',
                color: '',
                bin: '',
                picture_url: '',
            });
            event.target.reset();
        }
    }
    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({
            ...formData,
            [inputName]: value
        });
    }
    return (
        <div className='row'>
            <div className='offset-3 col-6'>
                <div className='shadow p-4 mt-4'>
                    <h1> Create a new shoe</h1>
                    <form onSubmit={handleSubmit} id="create-shoe-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder='Manufacturer' required type='text' name='manufacturer' id='manufacturer' className='form-control' />
                            <label htmlFor='manufacturer'>Manufacturer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder='Model name' required type='text' name='model_name' id='model_name' className='form-control' />
                            <label htmlFor='model_name'>Model name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder='Color' required type='text' name='color' id='namcolore' className='form-control' />
                            <label htmlFor='color'>Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder='Picture URL' required type='text' name='picture_url' id='picture_url' className='form-control' />
                            <label htmlFor='picture_url'>Picture URL</label>
                        </div>

                        <div className="mb-3">
                            <select onChange={handleFormChange} required name="bin" id="bin" className="form-select">
                                <option value="">Choose a bin</option>
                                {bins.map(bin => {
                                    return (
                                        <option key={bin.import_href} value={bin.import_href}>{bin.closet_name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-light">Create</button>
                    </form>
                </div>
            </div>
        </div>



    )
}

export default ShoeCreate;

{/* <Link to='shoes/new'> Create a new shoe</Link> */ }
