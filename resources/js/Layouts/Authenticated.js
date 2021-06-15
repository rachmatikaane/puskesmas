import Navbar from "@/Components/Navbar";
import Header from "@/Components/Header";
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ValidationErrors from "@/Components/ValidationErrors";

export default function Authenticated(props) {
  React.useEffect(() => {
    if (props.message) {
      if (typeof props.message !== "string") {
        switch (props.message.type) {
          case "error":
            toast.error(props.message.text, { id: "error-message" });
        }
      } else {
        toast.success(props.message, { id: "success-message" });
      }
    }
  }, [props.message]);

  React.useEffect(() => {
    if (props.errors && Object.keys(props.errors).length > 0) {
      toast(<ValidationErrors errors={props.errors} />, {
        id: "validation-message",
      });
    }
  }, [props.errors]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className={`min-h-screen main ${props.header}`}>
        <Header />
        <section>{props.children}</section>
      </main>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        newestOnTop={true}
        closeOnClick
        hideProgressBar={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
      />
    </div>
  );
}
