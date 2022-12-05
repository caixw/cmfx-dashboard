// SPDX-License-Identifier: MIT

import React from "react";
import { useParams } from "react-router-dom";

export function GroupAccess() {
    const { id } = useParams();
    return <div>access{id}</div>;
}
