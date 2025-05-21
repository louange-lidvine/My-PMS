import type { ReactNode } from "react";
import UserHeader from "../common/UserHeader";

const UserDashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col gap-7 h-screen p-5">
            <UserHeader />
            <div className="flex flex-1 rounded-lg">
                {children}
            </div>
        </div>
    );
};

export default UserDashboardLayout;
