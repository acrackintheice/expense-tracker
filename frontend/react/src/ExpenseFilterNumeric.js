import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react'
import './expense-filter.css'

class ExpenseFilterNumeric extends React.Component {

    constructor(props) {
        super(props);

        this.state = { filterValue : 0, filterCompare : '>=' }

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleDropdownChange (e, { value }) {
        this.setState( {filterCompare: value} )
        this.props.onFilterBy(this.props.attribute, parseInt(this.state.filterValue), value)
    }

    handleInputChange (e, { value }) {
        this.setState( {filterValue: value} )
        this.props.onFilterBy(this.props.attribute, parseInt(value), this.state.filterCompare)
    }

    render() {

        const value = this.state.filterCompare;

        const filterPlaceholder = 'Filter by ' + this.props.filterName + ' (0)';
        const compareOptions = [
            { text: '>=', value: '>=' },
            { text: '>', value: '>' },
            { text: '<=', value: '<=' },
            { text: '<', value: '<' },
            { text: '=', value: '=' },
        ]

        return (
            <div className='value-filter-div'>
                <Input placeholder={filterPlaceholder} type='number' onChange={this.handleInputChange} />
                <Dropdown selection options={compareOptions} onChange={this.handleDropdownChange} value={value} />
            </div>

        )
    }
}

export default (ExpenseFilterNumeric);