import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    setTimeout(() => {
        navigate(-1);
    });
    return null;
};

export default NotFound;
