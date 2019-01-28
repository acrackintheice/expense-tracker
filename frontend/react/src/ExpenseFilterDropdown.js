import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import './expense-filter.css'

class ExpenseFilterDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = { filterValue : [] }

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    handleDropdownChange (e, { value }) {
        this.setState( {filterValue: value} )
        if (value.length > 0)
            this.props.onFilterBy(this.props.attribute, value, 'contains')
    }

    render() {

        const value = this.state.filterValue;
        const filterPlaceholder = 'Filter by ' + this.props.filterName;
        
        return (
            <Dropdown 
            fluid multiple search selection
            placeholder={filterPlaceholder} 
            onChange={this.handleDropdownChange}  
            options={this.props.options} 
            value={value} />
        )
    }
}

export default (ExpenseFilterDropdown);