import React from 'react';
import './expense-list.css'
import ExpenseItem from './ExpenseItem';
import ExpenseListHeader from './ExpenseListHeader';

class ExpenseList extends React.Component {

  render() {
    const expenses = this.props.expenses;

      return (
        <div className='expense-list'>
          <ExpenseListHeader />
          <div className='expense-list-content'>
            {expenses.map(exp => {
              return (
                <ExpenseItem onDelete={this.props.onDelete} key={expenses.indexOf(exp)} expense={exp} />
              );
            })}
          </div>
        </div>
      )
  }
}

export default (ExpenseList);