import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.init";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
     

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
        const result = await signInUser(email, password);
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Successfully Logged In",
            showConfirmButton: false,
            timer: 1500
        });
        navigate(location.state || '/'); 
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: error.message,
        });
    } finally {
        setLoading(false);
    }
};

// Google login
const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
        const result = await signInWithGoogle();
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
                    <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>

                   <form onSubmit={handleLogin}>
                   <fieldset className="fieldset space-y-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input 
                                type="email" 
                                name="email"
                                className="input input-bordered" 
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <input 
                                type="password" 
                                name="password"
                                className="input input-bordered" 
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="flex justify-end">
                            <a className="link link-primary link-hover text-sm">
                                Forgot password?
                            </a>
                        </div>

                        <button className="btn btn-neutral w-full mt-2">
                            Login
                        </button>
                    </fieldset>
                   </form>
                    {/* Google */}
                    <button className="btn bg-white text-black border-[#e5e5e5]" onClick={handleGoogleSignIn}>
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                    </button>

                    <p className="text-center text-sm mt-4">
                        Don’t have an account?{" "}
                        <Link className="link link-primary link-hover" to="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
