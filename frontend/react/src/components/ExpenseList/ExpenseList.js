import React from 'react';
import './expense-list.css'
import ExpenseItem from './ExpenseItem/ExpenseItem';

class ExpenseList extends React.Component {

  render() {
    const expenses = this.props.expenses;

    return (
      <div className='expense-list'>
        <div className='expense-list-content'>
          <ExpenseItem key={-1}
            onDelete={this.props.onDelete}
            onSave={this.props.onSave}
            currentState={'empty'}
            lastState={'empty'} />
          {expenses.map(exp => {
            return (
              <ExpenseItem
                currentState={'ready'}
                lastState={'ready'}
                onDelete={this.props.onDelete}
                onSave={this.props.onSave}
                key={expenses.indexOf(exp)}
                expense={exp} />
            );
          })}
        </div>
      </div>
    )
  }
}

export default (ExpenseList);