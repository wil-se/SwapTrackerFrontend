import React from 'react'
import { Table, Row, Col } from 'react-bootstrap';
const DashBoardOpenTradesTableHeader = () => {
    return (
        <tr>
                <th className="text-center">
                    TOKEN SYMBOL
                </th>
                <th className="text-center">
                TOKEN NAME
                </th>
                <th className="text-center wide-td">
                CURRENT VALUE
                </th>
                <th className="text-center wide-td">
                OPEN AT
                </th>
                <th className="text-center wide-td">
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
