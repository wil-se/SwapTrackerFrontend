import React from 'react'
import { Table, Row, Col } from 'react-bootstrap';
const DashBoardOpenTradesTableHeader = () => {
    return (
        <tr className="dashboard-table-container pb-2 tr">
                <th className="text-center">
                    TOKEN SYMBOL
                </th>
                <th className="text-center">
                TOKEN NAME
                </th>
                <th className="text-center">
                CURRENT VALUE
                </th>
                <th className="text-center">
                OPEN AT
                </th>
                <th className="text-center">
                CURRENT PRICE
                </th>
                <th className="text-center">
                P/L
                </th>
                <th className="text-center">
                P/L %
                </th>
                <th className="text-center">
                {"  "}
                </th>
        </tr>
    )
}

export default DashBoardOpenTradesTableHeader
