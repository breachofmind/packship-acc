import React from 'react'
import moment from 'moment'
import classnames from 'classnames'
import config from '../js/config'

/**
 * This component is an individual row in the TransactionTable component.
 * @constructor
 */
class TransactionTableRow extends React.Component
{
    render()
    {
        let {transaction,selected} = this.props;
        let returnDate = moment(transaction.returnDate);
        let rowClasses = classnames('return-detail-row',{
            'is-selected' : selected,
        });

        return (
            <tr className={rowClasses}>
                <td>{transaction.id}</td>
                <td>{transaction.returnReason}</td>
                <td>{returnDate.format(config.DATE_FORMAT)}</td>
                <td>{config.TODAY.diff(returnDate,'days')} Days</td>
                <td>{transaction.storeRepName}</td>
            </tr>
        )
    }
}

export default TransactionTableRow;