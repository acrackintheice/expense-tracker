import React from 'react';
import './expense-list.css'
import ExpenseItem from './ExpenseItem';

class ExpenseList extends React.Component {

  render() {
    const expenses = this.props.expenses;
    const canonicalExpense = { user : {name: '', email : '', googleId : ''}, location: '', date: new Date(), tag: { name: '', icon: '' }, value: 0 }

    return (
      <div className='expense-list'>
        <div className='expense-list-content'>
          <ExpenseItem key={-1}
            onDelete={this.props.onDelete}
            onSave={this.props.onSave}
            expense={canonicalExpense}
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