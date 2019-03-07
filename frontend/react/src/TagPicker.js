import React from 'react';
import { Icon, Dropdown } from 'semantic-ui-react'

class TagPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tag: { name: "", icon: "" },
        };


        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.trigger = this.trigger.bind(this);
    }

    trigger = (icon) => (
        <span>
            <Icon bordered inverted size="large" name={icon} className="expense-list-item-icon" />
        </span>
    )

    handleDropdownChange(e, { value }) {
        this.setState({ tag: value });
        this.props.onTagChange(value);
    }

    options = [
        { key: 'food', name: 'Food', icon: 'food' },
        { key: 'user', name: 'user', icon: 'user' },
    ]

    render() {
        const value = this.state.tag;
        const trigger = this.trigger(this.state.tag.icon);

        return <Dropdown
            value={value}
            trigger={trigger}
            options={this.options}
            onChange={this.handleDropdownChange}
            pointing='top left'
            icon={null} />
    }

}

export default (TagPicker);