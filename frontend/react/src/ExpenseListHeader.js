import React from 'react';
import { Icon, Button } from 'semantic-ui-react'

class ExpensesListHeader extends React.Component {

    render() {
        return (
            <div className='expense-list-header'>
                <div className="expense-list-header-left-div">

                </div>
                <div className="expense-list-header-right-div">
                    <Button color='green' size='tiny' basic >
                        <Icon name='add' />
                        New Expense
                    </Button>
                </div>
            </div>
        )
    }
}

export default (ExpensesListHeader);