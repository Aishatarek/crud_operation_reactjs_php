import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function AddUser() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        designation: ""
    });

    const { name, email, designation } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('designation', designation)
        await axios({
            method: 'post',
            url: 'http://localhost/react/users.php/',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                console.log(response)
                alert('New Contact Successfully Added.');
            })
            .catch(function (response) {
                //handle error
                console.log(response)
            });

    };
    return (
        <div className="container bg-light">
            <div>
                <div className="theform">
                    <h3>Add User</h3>
                    <form onSubmit={e => onSubmit(e)}>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                name="name"
                                value={name}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter Email"
                                name="email"
                                value={email}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter Job"
                                name="designation"
                                value={designation}
                                onChange={e => onInputChange(e)}
                            />
                        </div>

                        <button>Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser
