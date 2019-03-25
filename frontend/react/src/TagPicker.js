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

    hasExpired(token) {
        return Date.now() > token.expires_at
    }

    handleDropdownChange(e, { value }) {

        const option = this.state.options[value]
        const newTag = { name: option.key, icon: option.icon }

        this.setState({
            tag: { name: newTag },
            trigger: <Icon bordered inverted size="large" className="expense-list-item-icon" name={newTag.icon} />
        });
        this.props.onTagChange(newTag);
    }

    getTags() {
        const googleTokenObj = localStorage.getItem('googleTokenObj')

        if (googleTokenObj) {

            const parsedGoogleTokenObj = JSON.parse(googleTokenObj);

            if (!this.hasExpired(parsedGoogleTokenObj)) {
                fetch(this.state.url,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + parsedGoogleTokenObj.id_token
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
                                        value: result.indexOf(tag),
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
            else
                console.log('Unable to perform fetch because the current access token has already expired')
        }
        else
            console.log('Unable to perform fetch, invalid access token')
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