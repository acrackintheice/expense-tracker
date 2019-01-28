import React from 'react';
import ExpenseValue from './ExpenseValue'
import ExpenseDate from './ExpenseDate'
import ExpenseLocation from './ExpenseLocation'
import { Icon } from 'semantic-ui-react'

class ExpenseItem extends React.Component {

    render() {
        return (
            <div className="expense-item">
                <div className="expense-item-left-div">
                    <Icon circular bordered size="large" inverted name={this.props.expense.tag.icon} />
                    <div>
                        <ExpenseLocation location={this.props.expense.location} />
                        <ExpenseDate date={this.props.expense.date} />
                    </div>
                </div>
                <div className="expense-item-right-div">
                    <ExpenseValue currency="R$" value={this.props.expense.value} />
                </div>
            </div>
        )
    }

}

export default (ExpenseItem);