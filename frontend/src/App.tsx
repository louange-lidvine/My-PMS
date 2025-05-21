import CarActions from "./pages/Admin/CarActions";
import Parkings from "./pages/Admin/Parkings";
import Reports from "./pages/Admin/Reports";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Routes, Route } from "react-router-dom";
import UserParkings from "./pages/user/Parkings";
import { ProtectedRoute } from "./components/security/ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/admin/parkings"
                element={
                    <ProtectedRoute>
                        <Parkings />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/parkings"
                element={
                    <ProtectedRoute>
                        <UserParkings />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/reports"
                element={
                    <ProtectedRoute>
                        <Reports />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/car-actions"
                element={
                    <ProtectedRoute>
                        <CarActions />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
