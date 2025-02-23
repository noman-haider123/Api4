import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router';

export default function Crud() {
    const [data, setdata] = useState([]);
    useEffect(() => {
        fetchdata();
    }, [])
    const fetchdata = async () => {
        try {
            const response = await axios.get('http://localhost:5167/api/Product', {
                headers: {
                    'Accept': 'application/json',
                }
            });
            setdata(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    const deletedata = (id)=>{
        if(window.confirm("Are You Sure You Want to delete this Record")){
          axios.delete(`http://localhost:5167/api/Product/${id}`,{
                headers:{
                    'Accept': 'application/json',
                }
            })
            window.location.reload();
        }
    }
    return (
        <>
            <div className='container mt-5'>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <Link className='btn btn-outline-primary' to={'/Createdata'}>Createdata</Link>
                        <h1>Crud Operation</h1>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Image</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.age}</td>
                                            <td> <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: '100px', height: '100px' }}
                                            /></td>
                                            <td><Link className="btn btn-primary" to={`/Editdata/${item.id}`}>Update</Link></td>
                                            <td><button className="btn btn-danger" onClick={()=>{deletedata(item.id)}}>Delete</button></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No Data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
