import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost/react/users.php");
    setUser(result.data.reverse());
  };

  const deleteUser = (productId) => {
    axios.post('http://localhost/react/users.php/?delete=' + productId)
      .then((result) => {
        loadUsers();
      })
      .catch(() => {
        alert('Error in the Code');
      });
  };

  return (
    <section className="AllUsers">
        <h3>All Users</h3>
        <table className="">
          <thead>
            <tr>
              <th>#</th>
              <th> Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.designation}</td>
                <td>
                  <Link to={`/UpdateUser/${user.id}`} className="editBTN">
                    Edit
                  </Link>
                  <button onClick={() => deleteUser(user.id)} className="deleteBTN">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
  );
};
export default Home;