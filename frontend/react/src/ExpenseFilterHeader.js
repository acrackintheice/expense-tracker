import React from 'react';
import { Icon } from 'semantic-ui-react'
import './expense-filter.css'

class ExpenseFilterHeader extends React.Component {

    render() {
        return (
            <div className='expense-filter-header'>
                <div className="filter-header-left">
                    <Icon name='filter' />
                </div>
                <div className="filter-header-right">
                    Filter Header
                </div>
            </div>
        )
    }
}

export default (ExpenseFilterHeader);