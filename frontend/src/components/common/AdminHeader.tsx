import { Link } from "react-router-dom";

function AdminHeader() {
    return (
        <header className="bg-black text-white p-4 flex justify-between items-center rounded-lg">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <nav className="flex gap-4">
                <Link to="/admin">Parkings</Link>
                <Link to="/admin/reports">Reports</Link>
                <Link to="/admin/car-actions">Car Actions</Link>
                <Link to="/logout">Logout</Link>
            </nav>
        </header>
    );
}

export default AdminHeader;
