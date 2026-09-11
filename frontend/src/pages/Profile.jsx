import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";

function Profile() {

  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUser(data)
      console.log(data);
      
      
    };

    getProfile();
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Profile
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium text-gray-800">{user?.user?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium text-gray-800">
             {user?.user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-600 text-white py-2 rounded-md font-medium hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
