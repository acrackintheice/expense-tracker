import React from 'react';
import ExpenseValue from './ExpenseValue'
import ExpenseDate from './ExpenseDate'
import ExpenseLocation from './ExpenseLocation'
import { Icon, Button, Input } from 'semantic-ui-react'
import TagPicker from './TagPicker';

class ExpenseItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentState: this.props.currentState,
            lastState: this.props.lastState,
            newExpense: this.props.expense
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.editableItem = this.editableItem.bind(this);
        this.emptyItem = this.emptyItem.bind(this);
        this.regularItem = this.regularItem.bind(this);
        this.handleEditActivation = this.handleEditActivation.bind(this);
        this.handleEditDeactivation = this.handleEditDeactivation.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
    }

    handleTagChange(tag) {
        let exp = this.state.newExpense;
        exp.tag = tag;
        this.setState(
            {
                newExpense: exp
            })
    }

    handleCostChange = (event) => {
        let exp = this.state.newExpense;
        exp.value = event.target.value;
        this.setState(
            {
                newExpense: exp
            })
    }

    handleLocationChange = (event) => {
        let exp = this.state.newExpense;
        exp.location = event.target.value;
        this.setState(
            {
                newExpense: exp
            })
    }

    handleDateChange = (event) => {
        let exp = this.state.newExpense;
        exp.date = event.target.value;
        this.setState(
            {
                newExpense: exp
            })
    }

    handleEditActivation = () => {
        this.setState({ currentState: 'editable', lastState: this.state.currentState })
        //this.highlightEdit();
    }

    handleEditDeactivation = () => {
        this.setState({ currentState: this.state.lastState, lastState: this.state.currentState, newExpense: this.props.expense })
    }

    handleSave = () => {
        this.props.onSave(this.state.newExpense);
        this.setState({
            currentState: this.state.lastState,
            lastState: this.state.currentState,
            newExpense: {
                user: { name: '', email: '', googleId: '' },
                location: '', date: new Date(),
                tag: { name: '', icon: '' },
                value: 0
            }
        })
    }

    handleDelete = () => {
        this.props.onDelete(this.props.expense);
    }

    editableItem = () => {
        return (
            <div className="new-expense-div">
                <div className="new-expense-content" >
                    <div className="new-expense-content-left">
                        <TagPicker onTagChange={this.handleTagChange} />
                        <div className="location-date-div">
                            <Input transparent placeholder='Insert a Location' value={this.state.newExpense.location} onChange={this.handleLocationChange} />
                            <Input transparent type='datetime-local' value={this.state.newExpense.date} onChange={this.handleDateChange} />
                        </div>
                    </div>
                    <div className="new-expense-content-center">
                        <Input label='R$' placeholder='322' size="small" type="number" min="0" value={this.state.newExpense.value} onChange={this.handleCostChange} />
                    </div>
                    <div className="new-expense-content-right">
                        <Button color='red' size='tiny' basic onClick={this.handleEditDeactivation}>
                            <Icon name='cancel' />
                            Cancel
                        </Button>
                        <Button color='green' size='tiny' basic onClick={this.handleSave}>
                            <Icon name='check' />
                            Done
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    emptyItem = () => {
        return (
            <div className='expense-item'>
                <div className="expense-item-left-div">

                </div>
                <div className="expense-item-center-div">
                    <Button color='green' size='tiny' basic onClick={this.handleEditActivation}>
                        <Icon name='add' />
                        New Expense
                    </Button>
                </div>
                <div className="expense-item-right-div">

                </div>
            </div>
        )
    }

    regularItem = () => {
        return (
            <div className="expense-item">
                <div className="expense-item-left-div">
                    <Icon bordered inverted size="large" name={this.props.expense.tag.icon} className="expense-list-item-icon" />
                    <div>
                        <ExpenseLocation location={this.props.expense.location} />
                        <ExpenseDate date={this.props.expense.date} />
                    </div>
                </div>
                <div className="expense-item-center-div" >
                    <ExpenseValue currency="R$" value={this.props.expense.value} />
                </div>
                <div className="expense-item-right-div">
                    <Button basic size='tiny' color='red' onClick={this.handleDelete} >
                        <Icon name='trash' />
                        Delete
                    </Button>
                </div>
            </div>
        )

    }

    render() {
        if (this.state.currentState === 'empty')
            return this.emptyItem();
        else if (this.state.currentState === 'editable')
            return this.editableItem();
        else
            return this.regularItem();
    }

}

export default (ExpenseItem);