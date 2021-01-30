import React from 'react'
import { Box, Typography } from "@material-ui/core";
import { Trans } from "react-i18next";

function FieldAndValue(props) {
    const { field, value } = props

    return (
        <Typography component={'span'} >
            <Box fontWeight='fontWeightBold' display='inline'>
                <Trans>{field}</Trans>:{" "}
            </Box>
            {value}
        </Typography>
    )
}

export default FieldAndValue