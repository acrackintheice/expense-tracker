import React from 'react';
import { Icon, Dropdown } from 'semantic-ui-react'
import TagService from '../../../../services/TagService'
import GoogleService from '../../../../services/GoogleService'
import './tag-picker.css'

const TagPicker = props => {

    const [state, setState] = React.useState({
        tag: { name: 'question', icon: 'question' },
        trigger: <Icon bordered inverted size="big" className="expense-list-item-icon" name='question' />,
        options: []
    });

    React.useEffect(() => {
        if (GoogleService.isGoogleInfoSet())
            if (!GoogleService.isGoogleInfoExpired())
                getTags(GoogleService.getToken().id_token);
            else
                console.log("Can't get tags, current google token has already expired")
        else
            console.log("Can't get tags, no logged in user")
    }, []);

    const getTags = (accessToken) => {
        TagService.getAll(accessToken)
            .then(result => result.json())
            .then(result => {
                    const newOptions = result.map(tag => ({key: tag.name, text: '', value: result.indexOf(tag), icon: tag.icon}))
                    setState({tag: state.tag, trigger: state.trigger, options: newOptions})
                })
            .catch(error => console.log(error))
    }

    const handleDropdownChange = (e, { value }) => {

        const option = state.options[value]
        const newTag = { name: option.key, icon: option.icon }

        setState({
            tag: { name: newTag },
            trigger: <Icon bordered inverted size="big" className="expense-list-item-icon" name={newTag.icon} />,
            options: state.options
        });
        props.onTagChange(newTag);
    }

    return <Dropdown
        className='tag-picker-dropdown'
        placeholder='Pick a Tag'
        trigger={state.trigger}
        options={state.options}
        onChange={handleDropdownChange}
    />

}

export default TagPicker;