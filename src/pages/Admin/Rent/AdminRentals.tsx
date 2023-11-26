import AdminRentalsTable from "@/components/Admin/AdminRentalsTable.tsx";
import Header from "@/components/Header.tsx";
import CenteredContainer from "@/components/UI/CenteredContainer.tsx";
import {FC} from "react";

const AdminRentals: FC = () => {
    return (
        <div>
            <Header/>
            <CenteredContainer>
                <AdminRentalsTable/>
            </CenteredContainer>
        </div>
    );
};

export default AdminRentals;