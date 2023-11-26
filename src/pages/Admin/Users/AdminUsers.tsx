import AdminUsersTable from "@/components/Admin/AdminUsersTable.tsx";
import Header from "@/components/Header.tsx";
import CenteredContainer from "@/components/UI/CenteredContainer.tsx";
import {FC} from "react";

const AdminUsers: FC = () => {
    return (
        <div>
            <Header/>
            <CenteredContainer>
                <AdminUsersTable/>
            </CenteredContainer>
        </div>
    );
};

export default AdminUsers;