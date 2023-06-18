"use client";
import { Toaster } from "react-hot-toast";
import {ThemeProvider} from "next-themes"

const Provider = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider
    defaultTheme="system" 
    attribute="class">
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
    {children}
    </ThemeProvider>
  );
};

export default Provider;
