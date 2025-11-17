import React from 'react';
import { FaHandsHelping } from "react-icons/fa";

const Volunteer = () => {
    return (
        <div className="py-2 px-6 md:px-16">
        <div className="rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-10">
  
          {/* Left Text */}
          <div className="space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
              <FaHandsHelping className="text-5xl" />
              Join Our Clean Drive
            </h2>
  
            <p className="text-lg opacity-90 leading-relaxed">
              Become a community hero by volunteering in our neighborhood clean-up
              events. Together, we can make our city greener, cleaner & healthier.
            </p>
  
            <button className="btn bg-blue-500 text-white-700 hover:bg-blue-400 font-semibold mt-4 px-6 py-3 rounded-lg text-lg shadow-md">
            Join as Volunteer
            </button>
          </div>
  
          {/* Right Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=60"
              className="rounded-xl shadow-lg"
              alt="clean drive volunteers"
            />
          </div>
        </div>
      </div>
    );
};

export default Volunteer;