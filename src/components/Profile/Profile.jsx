import React, { use, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user, updateUser, loading } = use(AuthContext);
  const navigate = useNavigate();

  // local form state (pre-filled with current user data)
  const [form, setForm] = useState({
    name: '',
    email: '',
    photoURL: '',
  });

  // fill the form when the user is loaded
  useEffect(() => {
    if (user) {
      setForm({
        name: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return;

    try {
      // only send fields that changed (optional)
      const updatedData = {};
      if (form.name !== user.displayName) updatedData.displayName = form.name;
      if (form.photoURL !== user.photoURL) updatedData.photoURL = form.photoURL;

      if (Object.keys(updatedData).length === 0) {
        Swal.fire({
            title: "No changes detected",
            icon: "success",
            draggable: true
          });
        return;
      }
      await updateUser(updatedData);
      Swal.fire({
        title: "Profile updated successfully!",
        icon: "success",
        draggable: true
      });
    //   alert('Profile updated successfully!');
      navigate('/'); // or wherever you want after success
    } catch (err) {
      console.error(err);
    //   alert('Failed to update profile: ' + err.message);
      Swal.fire({
        icon: "error",
        title: "Oops...Failed to update profile",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error">You must be logged in to edit your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>

          <form onSubmit={handleSubmit}>
            <fieldset className="space-y-3">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered"
                  placeholder="Enter your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email – read-only (Firebase auth email can't be changed via updateProfile) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  value={form.email}
                  disabled
                />
              </div>

              {/* Photo URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Photo URL</span>
                </label>
                <input
                  type="url"
                  name="photoURL"
                  className="input input-bordered"
                  placeholder="https://example.com/avatar.jpg"
                  value={form.photoURL}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-neutral w-full mt-4">
                Update Profile
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;