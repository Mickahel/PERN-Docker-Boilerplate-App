import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import _ from "lodash";
function useFormUtils(props) {
    let match = useRouteMatch();

    const isNew = () => !Boolean(match.params.id)

    const getId = () => match.params.id

    return {
        isNew,
        getId,
    }
}

export default useFormUtils;