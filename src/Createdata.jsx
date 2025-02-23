import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';
export default function Createdata() {
    const [name, setname] = useState("");
    const [age, setage] = useState("");
    const [image, setimage] = useState(null);
    const onchangeimage = (e) => {
        setimage(e.target.files[0])
    }
    const submit = async (e) => {
        e.preventDefault();
        if (!name || !age || !image) {
            alert("Please fill all the fields");
            return;
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("image", image);
        try {
            const response = await axios.post("http://localhost:5167/api/Product", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data.message) {
                alert(response.data.message);
                setimage("")
                setage("")
                setimage(null)
                window.location.href = '/'
            }
            else {
                alert(response.data.error);
            }
        }
        catch (error) {

            console.log(error);
        }
    }
    return (
        <>
            <div className='container'>
                <h1 className='text-center'>Create-data</h1>
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
                            <Form.Group className="mb-3" controlId="formBasicimage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" placeholder="image" onChange={onchangeimage} />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={submit}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
