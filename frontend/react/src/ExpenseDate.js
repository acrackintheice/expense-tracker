import React from 'react';

class ExpenseDate extends React.Component {

    static format(date) {
        var options = { hour12: false, month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString("en-US", options)
    }

    render() {
        return (
            <div className="expense-date expense-item-content">
                <span className="date-text">
                    {ExpenseDate.format(new Date(this.props.date)).replace(',', ' at')}
                </span>
            </div>
        )
    }

}

export default (ExpenseDate);