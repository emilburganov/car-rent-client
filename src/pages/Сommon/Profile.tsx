import UserTable from "@/components/Common/UserTable.tsx";
import Header from "@/components/Header.tsx";
import CenteredContainer from "@/components/UI/CenteredContainer.tsx";

const Profile = () => {
    return (
        <div>
            <Header/>
            <CenteredContainer>
                <UserTable/>
            </CenteredContainer>
        </div>
    );
};

export default Profile;
