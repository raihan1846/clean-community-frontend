import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { updateProfile } from 'firebase/auth';

const Register = () => {
  const { createUser , signInWithGoogle} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


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


  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
        const result = await signInWithGoogle();
        const user = result.user;

        // User data to save in DB
        const savedUser = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            createdAt: new Date(),
            provider: "google"
        };

        // Send to MongoDB
        await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(savedUser)
        });

        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Successfully Logged In with Google",
            showConfirmButton: false,
            timer: 1500
        });

        navigate(location.state || '/');

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Google Sign-In Failed",
            text: error.message,
        });
    } finally {
        setLoading(false);
    }
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

              {/* Google */}
              <button className="btn bg-white text-black border-[#e5e5e5]" onClick={handleGoogleSignIn}>
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                    </button>
          <p className="text-center text-sm mt-4">
            Already have an account? <Link className="link link-primary link-hover" to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
