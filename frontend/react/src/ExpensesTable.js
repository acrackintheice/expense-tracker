import React from 'react';
import { Table } from 'semantic-ui-react'
import './expenses-table.css'

class ExpensesTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      expenses: []
    };
    
  }

  render() {
    const { error, isLoading } = this.state;
    const expenses = this.props.expenses;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <Table celled padded selectable className="expenses-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Who </Table.HeaderCell>
              <Table.HeaderCell> When </Table.HeaderCell>
              <Table.HeaderCell> Where </Table.HeaderCell>
              <Table.HeaderCell> How Much</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {expenses.map(exp => {
              return (
                <Table.Row key={expenses.indexOf(exp)}>
                  <Table.Cell> {exp.user.name} </Table.Cell>
                  <Table.Cell> {exp.date} </Table.Cell>
                  <Table.Cell> {exp.location} </Table.Cell>
                  <Table.Cell> {exp.value} </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )
    }
  }
}

export default (ExpensesTable);