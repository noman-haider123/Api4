import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router';
export default function Editdata() {
    let id = useParams().id
    const [name, setname] = useState("");
    const [age, setage] = useState("");
    const [image, setimage] = useState(null);
    const [file, setfile] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5167/api/Product/${id}`, {
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (response.data) {
                    setname(response.data.name);
                    setage(response.data.age);
                    setfile(response.data.image);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);
    const handleonchange = (e) => {
        setimage(e.target.files[0])
    }
    const update = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("image", image);
        if(!name || !age || !image){
            alert("Please fill all the fields")
            return;
        }
        try {
            const response = await axios.put(`http://localhost:5167/api/Product/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            if (response.data) {
                alert(response.data.message)
                setname("");
                setage("");
                setimage(null);
                setfile(null);
                window.location.href = '/'
            }
            else {
                alert(response.data.message)
            }
        }
        catch (error) {
            console.error("Error updating data:", error);
        }
    }

    return (
        <>
            <div className='container'>
                <h1 className='text-center'>Edit-data</h1>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <Form encType='multipart/form-data'>
                            <Form.Group className="mb-3" controlId="formBasicname">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setname(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" placeholder="number" value={age} onChange={(e) => setage(e.target.value)} />
                            </Form.Group>
                            <FormGroup className='mb-3' >
                                <img src={file} width={100} height={100} ></img>
                            </FormGroup>
                            <Form.Group className="mb-3" controlId="formBasicimage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" placeholder="image" onChange={handleonchange} />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={update}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
