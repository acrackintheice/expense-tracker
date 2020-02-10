import React from 'react';
import './expense-location.css'

class ExpenseLocation extends React.Component {

    render() {
        return (
            <div className="expense-location expense-item-content">
                <span className="location-text">
                    {this.props.location}
                </span>
            </div>
        )
    }

}

export default (ExpenseLocation);