import React from "react";
import uuid from "react-uuid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useEffect } from "react";
import { Box } from "@mui/material";
import { isEmpty } from "lodash";
import { shallowEqual, useSelector } from "react-redux";

import useDispatchAction from "hooks/useDispatchAction";

import { getColorsForGivenPage } from "reduxware/selectors";
import { TABLE_FIELDS, TABLE_HEADERS } from "config";
import { getProducts } from "reduxware/reducers/colorsReducer";

const containerStyle = {
    width: "320px !important",
    margin: "0 auto",
    border: "2px solid #1565C0",
    padding: 2,
    boxShadow: 6,
    paddingBottom: "25px",
};

const tableStyle = { maxWidth: 300, margin: "0 auto" };

const rowStyle = { cursor: "pointer" };

interface Props {
    pageNumber?: number;
}

function ColorsTable(props: Props) {
    const { pageNumber } = props;
    // const colors = useSelector(getColorsForGivenPage);
    const products = useSelector(getProducts);
    const { showModal } = useDispatchAction();
    const { showCertainPage } = useDispatchAction();
    useEffect(() => {
        showCertainPage(pageNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);
    if (!products || isEmpty(products)) return null;

    return (
        <TableContainer sx={{ ...containerStyle }} component={Box}>
            <Table sx={{ ...tableStyle }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {TABLE_HEADERS.map((label, index) => (
                            <TableCell key={uuid()} align={index === 0 ? "left" : "right"}>
                                <b>{label}</b>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map(row => (
                        <TableRow
                            key={uuid()}
                            sx={{ background: row.color, ...rowStyle }}
                            onClick={() => {
                                showModal(row.id);
                            }}
                        >
                            {TABLE_FIELDS.map((field, index) => (
                                <TableCell
                                    key={uuid()}
                                    component={index === 0 ? "th" : undefined}
                                    scope={index === 0 ? "row" : undefined}
                                >
                                    {row[field]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default React.memo(ColorsTable);
