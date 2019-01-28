import React from 'react';
import './expense-list.css'
import ExpenseItem from './ExpenseItem';
import ExpenseListHeader from './ExpenseListHeader';

class ExpensesList extends React.Component {

  render() {
    const expenses = this.props.expenses;

    if (this.props.isLoading)
      return <div>Loading...</div>;
    else if (!this.props.isLoggedIn)
      return (
        <div className="login-message-parent">
          <div className="login-message-div"> You must login ir order to see content </div>
        </div>
      )
    else
      return (
        <div className='expense-list'>
          <ExpenseListHeader />
          <div className='expense-list-content'>
            {expenses.map(exp => {
              return (
                <ExpenseItem key={expenses.indexOf(exp)} expense={exp} />
              );
            })}
          </div>
        </div>
      )
  }
}

export default (ExpensesList);