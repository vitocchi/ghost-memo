import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Id extends Component {
    render() {
        const {
            input,
        } = this.props;
        return (
            <>
                <TextField
                    {...input}
                    id={this.props.id}
                    type="text"
                    label="ID"
                    variant="outlined"
                />
            </>
        )
    }
}

export default Id;