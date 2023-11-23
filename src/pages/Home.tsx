import {useNavigate} from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
    );
};

export default Home;
