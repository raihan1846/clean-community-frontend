import React from "react";
import { Link, useRouteError } from "react-router";

const Error = () => {
  const error = useRouteError();  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">

      <h1 className="text-9xl font-extrabold text-primary animate-bounce">
        404
      </h1>

      <p className="mt-4 text-2xl font-semibold">
        Oops! Page Not Found
      </p>
      <p className="mt-2 text-base-content/70 max-w-md">
        {error?.statusText || error?.message || "Something went wrong"}
      </p>

      <div className="mt-6">
        <Link to="/" className="btn btn-primary btn-wide">
          Go Back Home
        </Link>
      </div>

     
    </div>
  );
};

export default Error;
