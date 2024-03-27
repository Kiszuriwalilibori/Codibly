import Box from "@mui/material/Box";
import BaseModal from "@mui/material/Modal";
import uuid from "react-uuid";

import { shallowEqual, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { Divider, IconButton, Stack } from "@mui/material";
import { red } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

import useDispatchAction from "hooks/useDispatchAction";
import FullProductInfo from "./FullProductInfo";

import { getSelectedProductFullData, getIsModalVisible } from "reduxware/selectors";

export const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const closeButtonStyle = {
    margin: "0 auto",
};

function DetailsModal() {
    const isVisible = useSelector(getIsModalVisible, shallowEqual);
    const { hideModal } = useDispatchAction();
    const productData = useSelector(getSelectedProductFullData);

    if (!productData || isEmpty(productData)) return null;

    return (
        <BaseModal open={isVisible} onClose={() => hideModal()} aria-labelledby="parent-modal-title">
            <Box sx={{ ...modalStyle }}>
                <IconButton onClick={() => hideModal()}>
                    <CloseIcon sx={{ color: red[500] }} />
                </IconButton>
                <h2 id="parent-modal-title">Color details</h2>
                <Stack direction="column" divider={<Divider orientation="horizontal" flexItem />} spacing={1}>
                    {productData.map(item => {
                        return <FullProductInfo {...item} key={uuid()} />;
                    })}
                </Stack>
            </Box>
        </BaseModal>
    );
}

export default DetailsModal;
