import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import "./table.css"; 
import DeleteIcon from '@mui/icons-material/Delete';
function Transaction(props) {
  return (
    <section className="content">
      <Container fluid>
        <div className="row111">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">All Transactions</h3>

                <div className="card-tools">
                  <div className="input-group input-group-sm" style={{ width: '150px' }}>
                    <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />

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
                      <th>Training</th>
                      <th>Registrant</th>
                      <th>Trainer</th>
                      <th>Payment Status</th>
                      <th>Pay Trainer </th>

                      <th>Delete Client</th>

                    </tr>
                  </thead>
                  <tbody>
                   
                    <tr>
                      <td>1</td>
                      <td>Web Development</td>
                      <td>Chams Doula</td>
                      <td>Mongi Yaacoub</td>
                      <td>true</td>
                      <td><button>Pay</button></td>

                      <td><button><DeleteIcon/></button></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Design UI/UX </td>
                      <td>Yasmin Douik</td>
                      <td>Sara ben ali</td>
                      <td>true</td>
                      <td><button>Pay</button></td>

                      <td><button><DeleteIcon/></button></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>IT management</td>
                      <td>Hiba Garraoui</td>
                      <td>Achref Yaacoub</td>
                      <td>true</td>
                      <td><button>Pay</button></td>

                      <td><button><DeleteIcon/></button></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Network Engineering</td>
                      <td>Hamed Douik</td>
                      <td>Ahmed Ben Saleh</td>
                      <td>true</td>
                      <td><button>Pay</button></td>

                      <td><button><DeleteIcon/></button></td>
                    </tr>
                  
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

export default Transaction;
