import React from 'react'
import TransactionTableRow from './TransactionTableRow.jsx'

/**
 * This component is a Table of transactions for a product.
 * @constructor
 */
class TransactionTable extends React.Component
{
    render()
    {
        let {transactions,qty} = this.props;

        return (
            <table className="table returns-detail-table">
                <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Return Reason</th>
                    <th>Return Date</th>
                    <th>Age</th>
                    <th>Store Rep</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction,index) => (
                    <TransactionTableRow key={transaction.id} transaction={transaction} selected={qty > 0 && index < qty}/>
                ))}
                </tbody>
            </table>
        )
    }
}

export default TransactionTable;