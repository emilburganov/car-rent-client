import AdminCarsTable from "@/components/Admin/AdminCarsTable.tsx";
import Header from "@/components/Header.tsx";
import CenteredContainer from "@/components/UI/CenteredContainer.tsx";

const AdminCars = () => {
    return (
        <div>
            <Header/>
            <CenteredContainer>
                <AdminCarsTable/>
            </CenteredContainer>
        </div>
    );
};

export default AdminCars;