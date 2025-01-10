import React, { useState, useEffect } from "react";
import { baseUrl } from "../api/api-url";
import axios from "axios";
import Modal from "../components/Modal";

const AddTeachers = () => {
  const [classNames, setClassNames] = useState([]);

  const [className, setClassName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const password = "tch12345";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("Male");
  const [joiningDate, setJoiningDate] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onClose = () => {
    setIsModalOpen(false);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleJoiningDateChange = (e) => {
    setJoiningDate(e.target.value);
  };
  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-classes`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setClassNames(res.data);
        setClassName(res.data[0].class_name);
        // console.log(res.data[0].class_name);
        // console.log(classNames[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSelectClassChange = (e) => {
    setClassName(e.target.value);
  };

  const handleConfirm = () => {
    axios
      .post(
        `${baseUrl.baseUrl}/add-teacher`,

        {
          FirstName: firstName,
          MiddleName: middleName,
          LastName: lastName,
          Password: password,
          Email: email,
          PhoneNumber: phoneNumber,
          JoiningDate: joiningDate,
          BirthDate: birthDate,
          Gender: gender,
          ClassName: className,
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
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setJoiningDate("");
        setBirthDate("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <h5 className="text-uppercase mb-0 mt-0 page-title">add teacher</h5>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <ul className="breadcrumb float-right p-0 mb-0">
              <li className="breadcrumb-item">
                <a href="index.html">
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="index.html">Teacher</a>
              </li>
              <li className="breadcrumb-item">
                <span> Add Teacher</span>
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
            Teacher Added Successful!
          </div>
        )}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <form>
                      <div className="form-group">
                        <label>Firstname</label>
                        <input
                          required
                          type="text"
                          value={firstName}
                          className="form-control"
                          onChange={handleFirstNameChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Lastname</label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          value={lastName}
                          onChange={handleLastNameChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Email</label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          value={email}
                          onChange={handleEmailChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          className="form-control select"
                          value={gender}
                          onChange={handleGenderChange}
                        >
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Birth Date</label>
                        <input
                          className="form-control datetimepicker-input datetimepicker"
                          type="date"
                          dataToggle="datetimepicker"
                          value={birthDate}
                          onChange={handleBirthDateChange}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <form>
                      <div className="form-group">
                        <label>MiddleName</label>
                        <input
                          type="text"
                          className="form-control"
                          value={middleName}
                          onChange={handleMiddleNameChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Default Password</label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          value={password}
                          disabled
                          // onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Mobile number</label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Joining Date</label>
                        <input
                          className="form-control datetimepicker-input datetimepicker"
                          type="date"
                          dataToggle="datetimepicker"
                          value={joiningDate}
                          onChange={handleJoiningDateChange}
                        />
                      </div>
                      {/* <div className="form-group">
                        <label>ID</label>
                        <input type="text" className="form-control" />
                      </div> */}
                      <div className="form-group">
                        <label>Class</label>
                        <select
                          className="form-control select"
                          value={className}
                          onChange={handleSelectClassChange}
                        >
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
                      {/* <div className="form-group">
                        <label>Section</label>
                        <select className="form-control select" value={section}>
                          {sections.map((item, i) => (
                            <option key={i}>{item.section}</option>
                          ))}
                        </select>
                      </div> */}
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
                        {/* <button className="btn btn-secondary" type="reset">
                          Cancel
                        </button> */}
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

export default AddTeachers;
