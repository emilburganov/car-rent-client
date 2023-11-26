import ClientRentalsTable from "@/components/Client/ClientRentalsTable.tsx";
import Header from "@/components/Header.tsx";
import CenteredContainer from "@/components/UI/CenteredContainer.tsx";
import {FC} from "react";

const ClientRentals: FC = () => {
    return (
        <div>
            <Header/>
            <CenteredContainer>
                <ClientRentalsTable/>
            </CenteredContainer>
        </div>
    );
};

export default ClientRentals;