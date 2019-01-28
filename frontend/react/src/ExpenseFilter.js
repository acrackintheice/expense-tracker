import React from 'react';
import ExpenseFilterDropdown from './ExpenseFilterDropdown';
import ExpenseFilterSearch from './ExpenseFilterSearch';
import ExpenseFilterNumeric from './ExpenseFilterNumeric'
import './expense-filter.css';

class ExpenseFilter extends React.Component {

    render() {
        return (
            <div className='expense-filter'>
                <div className='expense-filter-item'>
                    <ExpenseFilterSearch />
                </div>
                <div className='expense-filter-item'>
                    <ExpenseFilterNumeric onFilterBy={this.props.onFilterBy} filterName="Cost" attribute='value' />
                </div>
                <div className='expense-filter-item'>
                    <ExpenseFilterDropdown onFilterBy={this.props.onFilterBy} filterName="Location" attribute='location' options={this.props.expenses.map(e => ({ text: e.location, value: e.location }))} />
                </div>
                <div className='expense-filter-item'  >
                    <ExpenseFilterDropdown onFilterBy={this.props.onFilterBy} filterName="Date" attribute='date' options={this.props.expenses.map(e => ({ text: e.date, value: e.date }))} />
                </div>
            </div>
        )
    }
}

export default (ExpenseFilter);