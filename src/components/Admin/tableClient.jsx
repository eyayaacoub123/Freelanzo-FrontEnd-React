import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import "./table.css";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

function TableClient(props) {
  const [data, setData] = useState(null);
  const [dataposts, setDatapost] = useState([]);//hedhi
  const [search, setsearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:5000/adminGetAllClients');
              setData(response.data);
              setDatapost(response.data)
          } catch (error) {
              setError(error.message);
          }
      };

      fetchData();

      // Cleanup function
      return () => {
          // Perform any cleanup if needed
      };
  }, []); 
  const handlesearch = (event) => {//hedhi
    const searchTerm = event.target.value;
    setsearch(searchTerm);
    console.log(searchTerm);
    if (data) {
        // Filter projects based on search term
        const filtereddata = data.filter((data) =>
           data.username && data.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(filtereddata);
    }

    if (searchTerm.length === 0) {
      setData(dataposts);
        console.log("hi");
        console.log(dataposts);
    }

};
  const handleDelete = async (clientId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/adminDeleteClient/${clientId}`);
      // Remove the deleted client from the data state
      setData(data.filter(item => item._id !== clientId));
      console.log(response.data); // Log success message
    } catch (error) {
      console.error(error); // Log error if any
    }
  };

  return (
    <section className="content">
      <Container fluid>
        <div className="row111">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">All Clients</h3>

                <div className="card-tools">
                  <div className="input-group input-group-sm" style={{ width: '150px' }}>
                    <input type="text" name="table_search" onChange={handlesearch} className="form-control float-right" placeholder="Search" />

                    <div className="input-group-append">
                      <button type="submit" className="btn btn-default">
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body table-responsive p-0">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Delete Client</th>
                    </tr>
                  </thead>
                  <tbody>
                  {data && data.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>
                        <button onClick={() => handleDelete(item._id)}>
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TableClient;
