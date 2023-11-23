import {useNavigate} from 'react-router-dom';
import useStores from "@/hooks/useStores";

const Private = () => {
    const {authStore} = useStores();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await authStore.logout();
        navigate("/login");
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Private;
