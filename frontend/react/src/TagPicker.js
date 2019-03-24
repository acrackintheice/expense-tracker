import React from 'react';
import { Icon, Dropdown } from 'semantic-ui-react'

class TagPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tag: { name: 'question', icon: 'question' },
            trigger: <Icon bordered inverted size="large" className="expense-list-item-icon" name='question' />,
            options: [],
            url: 'http://localhost:8080/tags/'
        };

        this.handleDropdownChange = this.handleDropdownChange.bind(this)
        this.getTags = this.getTags.bind(this)
    }

    componentDidMount() {
        this.getTags()
    }

    handleDropdownChange(e, { value }) {
        this.setState({
            tag: value,
            trigger: <Icon bordered inverted size="large" className="expense-list-item-icon" name={value.icon} />
        });
        this.props.onTagChange(value);
    }

    getTags() {
        const googleTokenObj = localStorage.getItem('googleTokenObj')

        if (googleTokenObj)
            fetch(this.state.url,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(googleTokenObj).id_token
                    }
                }
            )
                .then(result => result.json())
                .then(
                    (result) => {
                        this.setState({
                            options: result.map(tag => {
                                return {
                                    key: tag.name,
                                    text: '',
                                    value: tag,
                                    icon: tag.icon
                                };
                            })
                        });
                    },
                    (error) => {
                        console.log(error)
                    }
                )
    }

    render() {
        return <Dropdown
            className='tag-picker-dropdown'
            placeholder='Pick a Tag'
            trigger={this.state.trigger}
            options={this.state.options}
            onChange={this.handleDropdownChange}
        />
    }

}

export default (TagPicker);