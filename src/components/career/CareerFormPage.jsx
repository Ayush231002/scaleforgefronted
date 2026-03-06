import LayoutWrapper from "../layout/LayoutWrapper";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CareerFormPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    location: "",
    experience: "",
    skills: "",
    resume: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFile = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Application Submitted");
  };

  return (

    <LayoutWrapper>

      <div className="max-w-5xl mx-auto py-16 px-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#00B3C6] via-blue-500 to-purple-600 rounded-xl p-6 mb-10 shadow-lg">

          <div className="flex justify-between items-center">

            <h2 className="text-2xl font-bold text-white">
            {job ? `Apply for: ${job.title}` : "Submit Your Resume"}
            </h2>

            <button
              onClick={() => navigate("/career")}
              className="text-white text-xl hover:scale-110 transition"
            >
              ✕
            </button>

          </div>

        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-xl">

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="input-style"
              />

              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="input-style"
              />

              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="input-style"
              />

              <input
                name="phone"
                placeholder="Mobile Number"
                onChange={handleChange}
                className="input-style"
              />

              <input
                name="linkedin"
                placeholder="LinkedIn Profile"
                onChange={handleChange}
                className="input-style"
              />

              <input
                name="location"
                placeholder="Current Location"
                onChange={handleChange}
                className="input-style"
              />

            </div>

            <input
              name="experience"
              placeholder="Experience (Example: 2 years)"
              onChange={handleChange}
              className="input-style w-full"
            />

            <input
              name="skills"
              placeholder="Skills (React, Node, Python...)"
              onChange={handleChange}
              className="input-style w-full"
            />

            {/* Resume Upload */}

            <div className="border-2 border-dashed border-[#00B3C6]/40 rounded-xl p-6 text-center hover:border-[#00B3C6] transition">

              <p className="text-gray-300 mb-2">
                Upload Resume
              </p>

              <input
                type="file"
                onChange={handleFile}
                className="text-white"
              />

              <p className="text-xs text-gray-400 mt-2">
                PDF / DOC / DOCX (Max 5MB)
              </p>

            </div>

            {/* Submit */}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00B3C6] to-blue-600 hover:scale-[1.02] transition py-3 rounded-lg text-white font-semibold shadow-lg"
            >
              Submit Application
            </button>

          </form>

        </div>

      </div>

    </LayoutWrapper>

  );
}