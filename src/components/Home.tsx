import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { areProductsNotEmpty } from "reduxware/selectors";
import { Paths } from "routes";

export const Home = () => {
    const isReadyToDisplayProducts = useSelector(areProductsNotEmpty);
    const navigate = useNavigate();
    useEffect(() => {
        isReadyToDisplayProducts && navigate(Paths.first);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReadyToDisplayProducts]);

    return null;
};

export default Home;
