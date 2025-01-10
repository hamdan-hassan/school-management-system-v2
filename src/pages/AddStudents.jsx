import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../api/api-url";
import Modal from "../components/Modal";

const AddStudents = () => {
  const [classNames, setClassNames] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    birthdate: "",
    languagesSpoken: "",
    fathersName: "",
    fathersContact: "",
    mothersContact: "",
    middleName: "",
    gender: "Male",
    className: "",
    address: "",
    fathersOccupation: "",
    mothersName: "",
    mothersOccupation: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-classes`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setClassNames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectClassChange = (e) => {
    setFormData({
      ...formData,
      className: e.target.value,
    });
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log(formData);
    axios
      .post(
        `${baseUrl.baseUrl}/add-student`,

        {
          FirstName: formData.firstname,
          MiddleName: formData.middleName,
          LastName: formData.lastname,
          Gender: formData.gender,
          Languages: formData.languagesSpoken,
          Address: formData.address,
          BirthDate: formData.birthdate,
          ClassName: formData.className,
          FatherName: formData.fathersName,
          FatherOccupation: formData.fathersOccupation,
          FatherContact: formData.fathersContact,
          MotherName: formData.mothersName,
          MotherOccupation: formData.mothersOccupation,
          MotherContact: formData.mothersContact,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setSubmitted(true);
        setFormData({
          firstname: "",
          lastname: "",
          birthdate: "",
          languagesSpoken: "",
          fathersName: "",
          fathersContact: "",
          mothersContact: "",
          middleName: "",
          gender: "Male",
          className: "",
          address: "",
          fathersOccupation: "",
          mothersName: "",
          mothersOccupation: "",
        });
        setIsModalOpen(false);
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setIsModalOpen(false);
      });
  };

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <h5 className="text-uppercase mb-0 mt-0 page-title">Add Student</h5>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <ul className="breadcrumb float-right p-0 mb-0">
              <li className="breadcrumb-item">
                <a href="index.html">
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="index.html">Student</a>
              </li>
              <li className="breadcrumb-item">
                <span> Add Student</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="page-content">
        {submitted && (
          <div
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              textAlign: "center",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            Student Added Successful!
          </div>
        )}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <form className="custom-mt-form">
                      <div className="form-group">
                        <label>Firstname</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Lastname</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Birthdate</label>
                        <input
                          type="date"
                          className="form-control"
                          name="birthdate"
                          value={formData.birthdate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Languages Spoken</label>
                        <input
                          type="text"
                          className="form-control"
                          name="languagesSpoken"
                          value={formData.languagesSpoken}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Father's Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fathersName"
                          value={formData.fathersName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Father's Contact</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fathersContact"
                          value={formData.fathersContact}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Mother's Contact</label>
                        <input
                          type="text"
                          className="form-control"
                          name="mothersContact"
                          value={formData.mothersContact}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* Add additional input fields */}
                    </form>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <form className="custom-mt-form">
                      <div className="form-group">
                        <label>MiddleName</label>
                        <input
                          type="text"
                          className="form-control"
                          name="middleName"
                          value={formData.middleName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          className="form-control select"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Class</label>
                        <select
                          className="form-control select"
                          value={formData.className}
                          onChange={handleSelectClassChange}
                        >
                          <option value="">Select Class</option>
                          {classNames.map((item) => (
                            <option
                              key={item.class_name}
                              value={item.class_name}
                            >
                              {item.class_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Father's Occupation</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fathersOccupation"
                          value={formData.fathersOccupation}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Mother's Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="mothersName"
                          value={formData.mothersName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Mother's Occupation</label>
                        <input
                          type="text"
                          className="form-control"
                          name="mothersOccupation"
                          value={formData.mothersOccupation}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Add additional input fields */}
                    </form>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <form>
                      <div className="form-group text-center custom-mt-form-group">
                        <button
                          className="btn btn-primary mr-2"
                          onClick={handleSubmit}
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                    <Modal
                      isOpen={isModalOpen}
                      onClose={onClose}
                      onConfirm={handleConfirm}
                    >
                      Are you sure you want to Submit?
                    </Modal>
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

export default AddStudents;
