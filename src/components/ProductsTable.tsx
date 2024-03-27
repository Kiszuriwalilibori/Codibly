import React, { useCallback } from "react";
import uuid from "react-uuid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useEffect } from "react";
import { Box } from "@mui/material";
import { debounce, isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { useDispatchAction } from "hooks";
import { DEBOUNCE_TIME_MS, TABLE_FIELDS, TABLE_HEADERS } from "config/config";
import { getProducts } from "reduxware/selectors";

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

function ProductsTable(props: Props) {
    const { pageNumber } = props;
    const products = useSelector(getProducts);
    const { showModal } = useDispatchAction();
    const { showCertainPage } = useDispatchAction();

    const handleClick = useCallback(
        debounce(id => {
            showModal(id);
        }, DEBOUNCE_TIME_MS),
        []
    );

    useEffect(() => {
        showCertainPage(pageNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

    useEffect(() => {
        return () => {
            handleClick.cancel();
        };
    }, [handleClick]);

    if (!products || isEmpty(products)) return null;

    return (
        <TableContainer sx={{ ...containerStyle }} component={Box} role="main">
            <Table sx={{ ...tableStyle }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {TABLE_HEADERS.map((label, index) => (
                            <TableCell key={uuid()} align={"left"}>
                                <strong>{label}</strong>
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
                                handleClick(row.id);
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

export default React.memo(ProductsTable);
