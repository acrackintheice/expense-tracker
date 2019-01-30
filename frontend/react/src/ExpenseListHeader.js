import React from 'react';
import { Icon, Button } from 'semantic-ui-react'


class ExpensesListHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };

        this.handleActivation = this.handleActivation.bind(this);
        this.handleDeactivation = this.handleDeactivation.bind(this);
    }

    handleActivation = () => this.setState({ active: true })
    handleDeactivation = () => this.setState({ active: false })

    render() {
        if (this.state.active)
            return (<div className='expense-list-header'>
                <div className="expense-list-header-left-div">
                    kappa
                </div>
                <div className="expense-list-header-center-div">
                    pride
                </div>
                <div className="expense-list-header-right-div">
                    <Button color='green' size='tiny' basic onClick={this.handleDeactivation}>
                        <Icon name='check' />
                        Done
                    </Button>
                    <Button color='red' size='tiny' basic onClick={this.handleDeactivation}>
                        <Icon name='cancel' />
                        Cancel
                    </Button>
                </div>
            </div>)
        else
            return (
                <div className='expense-list-header'>
                    <div className="expense-list-header-left-div">

                    </div>
                    <div className="expense-list-header-center-div">
                        <Button color='green' size='tiny' basic onClick={this.handleActivation}>
                            <Icon name='add' />
                            New Expense
                    </Button>
                    </div>
                    <div className="expense-list-header-right-div">

                    </div>
                </div>
            )
    }
}

export default (ExpensesListHeader);