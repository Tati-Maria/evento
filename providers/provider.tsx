"use client";
import { Toaster } from "react-hot-toast";

const Provider = ({}) => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        style: {
          color: "#fff",
          background: "rgb(168 85 247)",
        },
      }}
    />
  );
};

export default Provider;
