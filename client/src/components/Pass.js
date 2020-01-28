import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Pass extends Component {
    render() {
        const {
            input,
        } = this.props;
        return (
            <>
                <TextField
                    {...input}
                    id={this.props.id}
                    type="password"
                    label="Password"
                    variant="outlined"
                />
            </>
        )
    }
}

export default Pass;