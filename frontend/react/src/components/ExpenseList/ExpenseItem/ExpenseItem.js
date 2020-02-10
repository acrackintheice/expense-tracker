import './expense-item.css'
import React from 'react';
import ExpenseValue from './ExpenseValue/ExpenseValue'
import ExpenseDate from './ExpenseDate/ExpenseDate'
import ExpenseLocation from './ExpenseLocation/ExpenseLocation'
import { Icon, Button, Input } from 'semantic-ui-react'
import TagPicker from './TagPicker/TagPicker';
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'

class ExpenseItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentState: this.props.currentState,
            lastState: this.props.lastState,
            newExpense: {
                user: { name: '', email: '', googleId: '' },
                location: '',
                date: new Date(),
                tag: { name: 'question', icon: 'question' },
                value: 0
            }
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

    handleDateChange = (dates) => {
        let exp = this.state.newExpense;
        exp.date = dates[0];
        this.setState(
            {
                newExpense: exp
            })
    }

    handleEditActivation = () => this.setState((state) => ({ currentState: 'editable', lastState: state.currentState }))

    handleEditDeactivation = () => this.setState((state) => ({
        currentState: state.lastState,
        lastState: state.currentState
    }))

    handleSave = () => {
        this.props.onSave(this.state.newExpense).then((success) => {
            if (success) {
                this.setState({
                    currentState: this.state.lastState,
                    lastState: this.state.currentState,
                    newExpense: {
                        user: { name: '', email: '', googleId: '' },
                        location: '',
                        date: new Date(),
                        tag: { name: 'question', icon: 'question' },
                        value: 0
                    }
                })
            }
        });
    }

    handleDelete = () => {
        this.props.onDelete(this.props.expense);
    }

    editableItem = () => {
        return (
            <div className="expense-item new">
                <div className="new-expense-content-left">
                    <TagPicker onTagChange={this.handleTagChange} />
                    <div className="location-date-div">
                        <div className="location-input">
                            <Input placeholder='Insert a Location'
                                transparent
                                value={this.state.newExpense.location}
                                onChange={this.handleLocationChange} />
                        </div>
                        <Flatpickr
                            options={
                                {
                                    enableTime: true,
                                    dateFormat: "Y-m-d H:i",
                                    time_24hr: true
                                }
                            }
                            className="flatpickr-datetime"
                            value={this.state.newExpense.date}
                            onChange={this.handleDateChange}
                        />
                    </div>
                </div>
                <div className="new-expense-content-center">
                    <Input label='R$'
                        placeholder='322'
                        size="small" type="number"
                        min="0"
                        value={this.state.newExpense.value}
                        onChange={this.handleCostChange} />
                </div>
                <div className="new-expense-content-right">
                    <Button secondary onClick={this.handleEditDeactivation}>
                        <Icon className="button" name='cancel' />
                        Cancel
                    </Button>
                    <Button primary onClick={this.handleSave}>
                        <Icon className="button" name='check' />
                        Done
                    </Button>
                </div>
            </div>
        )
    }

    emptyItem = () => {
        return (
            <div className='expense-item empty'>
                <div className="expense-item-left-div">

                </div>
                <div className="expense-item-center-div">
                    <Button primary onClick={this.handleEditActivation}>
                        <Icon className="button" name='add' />
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
                    <Icon bordered inverted size="large" name={this.props.expense.tag.icon}
                        className="expense-list-item-icon" />
                    <div>
                        <ExpenseLocation location={this.props.expense.location} />
                        <ExpenseDate date={this.props.expense.date} />
                    </div>
                </div>
                <div className="expense-item-center-div">
                    <ExpenseValue currency="R$" value={this.props.expense.value} />
                </div>
                <div className="expense-item-right-div">
                    <Button color='red' onClick={this.handleDelete}>
                        <Icon className="button" name='trash' />
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