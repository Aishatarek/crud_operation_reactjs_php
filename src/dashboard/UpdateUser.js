import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditProduct = () => {

  // let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 
  const [user, setUser] = useState({
    name: "",
    email: "",
    designation: ""
  });

  const { name, email, designation } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('name', name)
    formData.append('email', email)
    formData.append('designation', designation)
    await axios({
      method: 'post',
      url: `http://localhost/react/users.php/?id=${id}`,
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

  const loadUser = async () => {
    const result = await axios.get(`http://localhost/react/users.php/?id=${id}`);
    setUser(result.data);
    console.log(result);
  };
  return (
    <div>

      <div className="theform">
        <h3>Edit User</h3>
        <form onSubmit={e => onSubmit(e)}>
          <div >
            <input
              type="text"
              placeholder="Id"
              name=""
              value={id}
              onChange={e => onInputChange(e)}
              readOnly
            />
          </div>
          <div >
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div >
          <label>Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div >
          <label>Job</label>
            <input
              type="text"
              placeholder="Enter Job"
              name="designation"
              value={designation}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button>Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;