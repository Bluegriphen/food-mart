import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Add from "./pages/add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import StaffMaster from "./features/staffMaster/staffMaster";
import CreateStaffType from "./features/staffMaster/CreateStaffType";
import Dashboard from "./features/DashboardEcommerce";
import StaffList from "./features/staff/StaffList";
import CreateStaff from "./features/staff/CreateStaff";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const url = "http://localhost:4000";
  
  return (
    <div className="app">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <Navbar />
      
      <div className="app-content">
        <Sidebar />
        <main className="main-content">
          <Routes>
            {/* Dashboard Routes */}
            <Route path="/" element={<Dashboard />} />
            
            {/* Product Routes */}
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            
            {/* Order Routes */}
            <Route path="/orders" element={<Orders url={url} />} />
            
            {/* Staff Master Routes */}
            <Route path="/staff-master" element={<StaffMaster />} />
            <Route path="/staff-type/create" element={<CreateStaffType />} />
            <Route path="/staff" element={<StaffList />} />
            <Route path="/staff/create" element={<CreateStaff />} />
            <Route path="/staff/edit/:id" element={<CreateStaff />} />

            
            {/* Add more routes as needed */}
            {/* <Route path="/staff-type/edit/:id" element={<EditStaffType />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;