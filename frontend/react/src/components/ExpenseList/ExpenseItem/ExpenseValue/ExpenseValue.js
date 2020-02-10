import React from 'react';
import './expense-value.css'

class ExpenseValue extends React.Component {

    render() {
        return (
            <div className="expense-value">
                {this.props.currency + this.props.value}
            </div>
        )
    }

}

export default (ExpenseValue);