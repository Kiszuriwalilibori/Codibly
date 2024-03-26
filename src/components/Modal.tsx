import Box from "@mui/material/Box";
import BaseModal from "@mui/material/Modal";
import uuid from "react-uuid";

import { shallowEqual, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { Divider, Stack } from "@mui/material";

import useDispatchAction from "hooks/useDispatchAction";
import FullProductInfo from "./FullProductInfo";

import { getSelectedProductFullData, getIsModalVisible } from "reduxware/selectors";
import { boxStyle } from "styles";

function Modal() {
    const isVisible = useSelector(getIsModalVisible, shallowEqual);
    const { hideModal } = useDispatchAction();
    const productData = useSelector(getSelectedProductFullData);

    if (!productData || isEmpty(productData)) return null;

    return (
        <BaseModal open={isVisible} onClose={() => hideModal()} aria-labelledby="parent-modal-title">
            <Box sx={{ ...boxStyle }}>
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

export default Modal;
