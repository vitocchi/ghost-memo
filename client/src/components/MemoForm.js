
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class MemoForm extends Component {
    render() {
        const {
            input,
        } = this.props;
        return (
            <>
                <TextField
                    {...input}
                    type="text"
                    label="MemoForm"
                    variant="outlined"
                />
            </>
        )
    }
}

export default MemoForm;