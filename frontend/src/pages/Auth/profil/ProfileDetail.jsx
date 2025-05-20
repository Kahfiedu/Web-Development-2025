import React from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiUser, FiLogOut, FiEdit } from "react-icons/fi";
import { BsClock, BsCheckCircle } from "react-icons/bs";
import KahfLogo from "../../../components/KahfLogo";
import { useAuth } from "../../../hooks/useAuth";

const ProfileDetail = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const userData = {
    name: "John Bee",
    class: "Kelas 2",
    username: "John",
    phone: "+62 8123 456 78",
    email: "siswa@gmail.com",
    gender: "Male",
    birthDate: "2 Jan 2015",
    password: "********",
    address: "Kab. Kubu Raya, Indonesia",
  };

  const tasks = [
    { id: 1, title: "Tugas menulis", date: "Today", time: "12:41", status: "progress" },
    { id: 2, title: "Tugas belajar", date: "Yesterday", time: "10:00", status: "done" },
    { id: 3, title: "Tugas belajar", date: "Friday", time: "18:00", status: "done" },
  ];

  const attendances = [
    { session: "Session 2", date: "Today, 8 Mei 2025", status: "Attend" },
    { session: "Session 1", date: "Yesterday, 7 Mei 2025", status: "Attend" },
  ];

  const payments = [{ date: "1 Maret 2025, Senin", status: "Paid" }];

  const handleLogout = () => {
    logout();
    navigate("/login"); // arahkan ke halaman login
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {/* Profile Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                alt="Profile"
                className="w-24 h-24 rounded-full bg-blue-100"
              />
              <div className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1">
                <FiEdit className="text-sm" />
              </div>
            </div>
            <h2 className="text-lg font-semibold mt-2">{userData.name}</h2>
            <p className="text-sm text-gray-600">{userData.class}</p>
          </div>

          <div className="space-y-4">
            {[
              { label: "Username", value: userData.username },
              { label: "No. Telp", value: userData.phone },
              { label: "Email", value: userData.email },
              { label: "Gender", value: userData.gender },
              { label: "Tanggal lahir", value: userData.birthDate },
              { label: "Password", value: userData.password },
              { label: "Alamat", value: userData.address },
            ].map((field, idx) => (
              <div key={idx} className="border-b pb-2">
                <div className="text-sm font-medium text-gray-500">{field.label}</div>
                <div className="text-sm">{field.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 bg-red-500 text-white py-2 rounded-md w-full hover:bg-red-600"
            >
              <FiLogOut /> LogOut
            </button>

            <button
              onClick={() => navigate("/siswa/profile-edit")}
              className="flex items-center justify-center gap-1 bg-blue-500 text-white py-2 rounded-md w-full hover:bg-blue-600"
            >
              <FiEdit /> Edit
            </button>
          </div>
        </div>

        {/* Task Section */}
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">Task 📝</h3>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-center border-b pb-2 pt-2"
                >
                  <div className="text-xs text-gray-500">
                    {task.date}
                    <br />
                    {task.time}
                  </div>
                  <div className="flex-grow px-4">
                    <div className="font-medium">{task.title}</div>
                  </div>
                  <div className="flex items-center">
                    {task.status === "progress" ? (
                      <>
                        <span className="text-xs mr-2">Progress</span>
                        <BsClock className="text-gray-600" />
                      </>
                    ) : (
                      <>
                        <span className="text-xs mr-2">Done</span>
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <BsCheckCircle className="text-green-600" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
              History Absen 📅
            </h3>
            <div className="space-y-3">
              {attendances.map((att, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg px-4 py-3 flex justify-between items-center"
                >
                  <div className="flex-grow">
                    <div className="text-sm font-medium">{att.session}</div>
                    <div className="text-xs text-gray-500">{att.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Attend</span>
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <BsCheckCircle className="text-green-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
              History Pembayaran 💰
            </h3>
            <div className="space-y-3">
              {payments.map((payment, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg px-4 py-3 flex justify-between items-center"
                >
                  <div className="text-sm">{payment.date}</div>
                  <div className="text-sm font-medium text-green-600">{payment.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
