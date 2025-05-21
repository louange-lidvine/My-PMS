import type { ReactNode } from "react";
import AdminHeader from "../common/AdminHeader";

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col gap-7 h-screen p-5">
            <AdminHeader/>
            <div className="flex flex-1 rounded-lg">
                {children}
            </div>
        </div>
    );
};

export default AdminDashboardLayout;
