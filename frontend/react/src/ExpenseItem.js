import React from 'react';
import ExpenseValue from './ExpenseValue'
import ExpenseDate from './ExpenseDate'
import ExpenseLocation from './ExpenseLocation'
import { Icon, Button } from 'semantic-ui-react'

class ExpenseItem extends React.Component {

    constructor(props) {
        super(props);

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick = () => {
        this.props.onDelete(this.props.expense);
    }

    render() {
        return (
            <div className="expense-item">
                <div className="expense-item-left-div">
                    <Icon bordered inverted size="large" name={this.props.expense.tag.icon} className="expense-list-item-icon"/>
                    <div>
                        <ExpenseLocation location={this.props.expense.location} />
                        <ExpenseDate date={this.props.expense.date} />
                    </div>
                </div>
                <div className="expense-item-center-div" >
                    <ExpenseValue currency="R$" value={this.props.expense.value} />
                </div>
                <div className="expense-item-right-div">
                    <Button basic size='tiny' color='purple'>
                        <Icon name='edit' />
                        Edit
                    </Button>
                    <Button basic size='tiny' color='red' onClick={this.handleDeleteClick} >
                        <Icon name='trash' />
                        Delete
                    </Button>
                </div>
            </div>
        )
    }

}

export default (ExpenseItem);