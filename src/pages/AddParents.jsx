import React from "react";

const AddParents = () => {
  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <h5 className="text-uppercase mb-0 mt-0 page-title">add parent</h5>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <ul className="breadcrumb float-right p-0 mb-0">
              <li className="breadcrumb-item">
                <a href="index.html">
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="index.html">Parents</a>
              </li>
              <li className="breadcrumb-item">
                <span> Add parent</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <form>
                      <div className="form-group">
                        <label>Firstname</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="form-group">
                        <label>Gender</label>
                        <select className="form-control select">
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <form>
                      <div className="form-group">
                        <label>Lastname</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>ID</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="form-group">
                        <label>Mobile number</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Student Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </form>
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <form>
                      <div className="form-group text-center custom-mt-form-group">
                        <button className="btn btn-primary mr-2" type="submit">
                          Submit
                        </button>
                        <button className="btn btn-secondary" type="reset">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddParents;
