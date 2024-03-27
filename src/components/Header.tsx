import Box from "@mui/material/Box";
import React from "react";

const h1Style = {
    "@media(max-width: 470px)": {
        fontSize: "3vw",
    },
};
const Header = () => {
    return (
        <header>
            <Box sx={{ ...h1Style }}>
                <h1>Colourful Products for Codibly</h1>
            </Box>
        </header>
    );
};

export default React.memo(Header);
