import React from 'react';
import { Icon, Dropdown } from 'semantic-ui-react'
import TagService from '../../../../services/TagService'
import GoogleService from '../../../../services/GoogleService'

class TagPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tag: { name: 'question', icon: 'question' },
            trigger: <Icon bordered inverted size="large" className="expense-list-item-icon" name='question' />,
            options: []
        };

        this.handleDropdownChange = this.handleDropdownChange.bind(this)
        this.getTags = this.getTags.bind(this)
    }

    componentDidMount() {
        if (GoogleService.isGoogleInfoSet())
            if (!GoogleService.isGoogleInfoExpired())
                this.getTags(GoogleService.getToken().id_token);
            else
                console.log("Can't get tags, current google token has already expired")
        else
            console.log("Can't get tags, no logged in user")
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

    getTags(accessToken) {
        TagService.getAll(accessToken)
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