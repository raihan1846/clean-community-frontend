import React, { useContext, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { updateProfile } from 'firebase/auth';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    const newUser = {name, email, password, photoURL};
    
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
    })

    createUser(email, password)
      .then(result => {
        // update displayName & photoURL
        return updateProfile(result.user, { displayName: name, photoURL });
      })
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Registered successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: error.message,
        });
      });
  };

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Welcome Sir</h2>

          <form onSubmit={handleRegister}>
            <fieldset className="fieldset space-y-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input type="text" className="input input-bordered" placeholder="Enter your Name" name="name" required />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input type="email" className="input input-bordered" placeholder="Enter your email" name="email" required />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Photo URL</span>
                </label>
                <input type="text" className="input input-bordered" placeholder="Enter your PhotoURL" name="photoURL" />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input input-bordered w-full"
                    placeholder="Enter your password"
                    name="password"
                    required
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-sm" onClick={handleTogglePassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <a className="link link-primary link-hover text-sm">Forgot password?</a>
              </div>

              <button className="btn btn-neutral w-full mt-2">Register</button>
            </fieldset>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account? <Link className="link link-primary link-hover" to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
