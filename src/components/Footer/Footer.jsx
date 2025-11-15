import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-base-content p-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
  
          {/* Logo + Description */}
          <div className="flex-1">
           
            <h2 className="text-3xl font-bold">Clean Community</h2>
            <p className="max-w-xs mt-2">
              Clean Community provides high-quality services and solutions to help you grow your business.
            </p>
            <p className="mt-4 text-sm">
              © {new Date().getFullYear()} YourSiteName. All rights reserved.
            </p>
          </div>
  
          {/* Useful Links */}
          <div className="flex-1">
            <h6 className="text-lg font-semibold mb-3"></h6>
            <br />
            <ul className="flex flex-col gap-2">
              <li><a className="link link-hover">Home</a></li>
              <li><a className="link link-hover">About Us</a></li>
              <li><a className="link link-hover">Services</a></li>
              <li><a className="link link-hover">Contact</a></li>
            </ul>
          </div>
  
          {/* Resources */}
          <div className="flex-1">
            <h6 className="text-lg font-semibold mb-3"></h6>
            <br />
            <ul className="flex flex-col gap-2">
              <li><a className="link link-hover">Blog</a></li>
              <li><a className="link link-hover">FAQs</a></li>
              <li><a className="link link-hover">Support</a></li>
              <li><a className="link link-hover">Privacy Policy</a></li>
            </ul>
          </div>
  
        </div>
      </footer>
    );
};

export default Footer;