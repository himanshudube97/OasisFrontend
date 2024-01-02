import { useState } from "react";
import { useAuthStore } from "../Zustand/store";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const navigate = useNavigate();
  const { createUser, } = useAuthStore((state) => {
    return { ...state };
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send data to an API)

    const {error} = await createUser(formData);

    if (!error) {
      toast.success("User Created Successfully");
      navigate("/login");
    } else {
      toast.error(error);
      setFormData({
        name: "",
        phone: "",
      });
    }
  };

  // if (loading) {
  //   return <Loader />;
  // }
  return (
    <>
      <form
        className="bg-white shadow-md rounded-lg p-8 max-w-sm mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Sign Up
        </button>
        <Link to="/login" className="text-blue-500">
          Already a User?
        </Link>
      </form>
      <ToastContainer />
    </>
  );
}

export default Signup;
