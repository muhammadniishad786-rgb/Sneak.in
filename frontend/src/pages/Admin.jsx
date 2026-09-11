import React, { useEffect, useState } from "react";

function Admin() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getAdminData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/admin", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        setMessage(data.message);

      } catch (err) {
        console.log(err.message);
      }
    };

    getAdminData();
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      <h3>{message}</h3>
    </div>
  );
}

export default Admin;
