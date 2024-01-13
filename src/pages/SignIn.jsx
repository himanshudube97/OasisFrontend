import { useState } from "react";
import { useAuthStore } from "../Zustand/store";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SignIn() {
  const [phone, setPhone] = useState("");

  const { loginUser } = useAuthStore((state) => {
    return { ...state };
  });
  const handleChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error} = await loginUser({ phone });
    if (!error) {
      toast.success("User Logged In");
    //   navigate("/signup");
    } else {
      toast.error(error);
      setPhone("");
    }
  };

  // if (loading) {
  //   return <Loader />;
  // }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-sm mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={phone}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
        <Link to="/signup" className="text-blue-500">
          Create an Account?
        </Link>
      </form>
      <ToastContainer />
    </>
  );
}

export default SignIn;
