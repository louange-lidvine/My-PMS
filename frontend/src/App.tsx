import CarActions from "./pages/Admin/CarActions";
import Parkings from "./pages/Admin/Parkings";
import Reports from "./pages/Admin/Reports";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Routes, Route } from "react-router-dom";
import UserParkings from "./pages/user/Parkings";
import { ProtectedRoute } from "./components/security/ProtectedRoute";
import AdminDashboardLayout from "./components/layouts/AdminDashboardLayout";
import UserDashboardLayout from "./components/layouts/UserDashboardLayout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminDashboardLayout>
                            <Parkings />
                        </AdminDashboardLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user"
                element={
                    <ProtectedRoute>
                        <UserDashboardLayout>
                            <UserParkings />
                        </UserDashboardLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/reports"
                element={
                    <ProtectedRoute>
                        <AdminDashboardLayout>
                            <Reports />
                        </AdminDashboardLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/car-actions"
                element={
                    <ProtectedRoute>
                        <AdminDashboardLayout>
                            <CarActions />
                        </AdminDashboardLayout>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
