import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import GetAllData from './dashboard/GetAllData';
import AddUser from './dashboard/AddUser';
import UpdateUser from './dashboard/UpdateUser';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/">All Users</Link></li>
            <li><Link to="/AddUser">Add User</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<GetAllData />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/UpdateUser/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
