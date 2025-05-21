import { Link } from "react-router-dom";

function UserHeader() {
    return (
        <header className="bg-black text-white p-4 flex justify-between items-center rounded-lg">
            <h1 className="text-xl font-bold">User Dashboard</h1>
            <nav className="flex gap-4">
                <Link to="/user/parkings">My Parkings</Link>
                <Link to="/logout">Logout</Link>
            </nav>
        </header>
    );
}

export default UserHeader;
