import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { purchesApi } from "../../../Store/coursesSlice";
import { useParams } from "react-router-dom";

function CourseEnrollmentForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    qualification: "",
    programing_knowledge: "",
    experiance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const data={
  //         name:formData.name,
  //         email:formData.email,
  //         phone:formData.phone,
  //         city:formData.city,
  //         address:formData.address,
  //         qualification:formData.qualification,
  //         programing_knowledge:formData.programing_knowledge,
  //         experiance:formData.experiance

  //     }
  //     dispatch(purchesApi({data,id}))

  // };

  const handleSubmit = ( e) => {
    e.preventDefault();
    
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        qualification: formData.qualification,
        programing_knowledge: formData.programing_knowledge,
        experiance: formData.experiance,
      };
     dispatch(purchesApi({ id, payload: data }));
   
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Course Enrollment Form</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        type="text"
        id="city"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
      />

      <label htmlFor="address">Address:</label>
      <textarea
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      ></textarea>

      <label htmlFor="qualification">Qualification:</label>
      <input
        type="text"
        id="qualification"
        name="qualification"
        value={formData.qualification}
        onChange={handleChange}
        required
      />

      <label htmlFor="programing_knowledge">Programming Knowledge:</label>
      <select
        id="programing_knowledge"
        name="programing_knowledge"
        value={formData.programing_knowledge}
        onChange={handleChange}
        required
      >
        <option value="">Select One</option>
        <option value="Beginner">c programming</option>
        <option value="Intermediate">Java programming</option>
        <option value="Advanced">C++ programming</option>
      </select>

      <label htmlFor="experiance">Experience in Selected One:</label>
      <select
        id="experiance"
        name="experiance"
        value={formData.experiance}
        onChange={handleChange}
        required
      >
        <option value="">Select One</option>
        <option value="None">None</option>
        <option value="Basic">6 month</option>
        <option value="Intermediate">1 year</option>
        <option value="Advanced">2 year</option>
      </select>

      <input type="submit" value="Submit" />
    </form>
  );
}

export default CourseEnrollmentForm;
