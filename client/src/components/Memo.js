import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import {openSnackbar} from "./Notifier";
import { setMemo } from '../actions';
import { Paper, Button, CircularProgress, Grid, InputBase } from '@material-ui/core';

class Memo extends Component {
    constructor(props) {
        super(props);
        this.saveMemo = this.saveMemo.bind(this);
        this.state = {
            loading: false
        };
    }
    async saveMemo() {
        this.setState({loading: true});
        const taskFn = 'save_memo(string, string, string)';
        const taskArgs = [
            [this.props.account.id, 'string'],
            [this.props.account.pass, 'string'],
            [this.props.memo, 'string'],
        ]
        this.props.enigma.computeTask(taskFn, taskArgs)
            .then(() => {
                openSnackbar({ message: 'memo stored'})
            })
            .catch((e) => {
                openSnackbar({ message: e.message })
            })
            .finally(() => {
                this.setState({loading: false});
            });
    }
    render() {
        let memo
        if (this.state.loading) {
            memo = (
                <CircularProgress/>
            );
        } else {
            memo = (
                <>
                    <Grid item xs={12}
                        style={{ padding: "1rem" }}
                    >
                        <Paper
                            style={{
                                padding: "1rem",
                                textAlign: "left"
                            }}
                        >
                            <InputBase
                                type="textarea"
                                value={this.props.memo}
                                multiline
                                fullWidth
                                rows={20}
                                onChange={e => this.props.setMemo(e.target.value)}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}
                        style={{ padding: "1rem" }}
                    >
                        <Button
                            onClick={ e => {
                                e.preventDefault()
                                this.saveMemo()
                            }}
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            STORE
                        </Button>
                    </Grid>
                </>
            );
        }
        return (
            <>
                <Grid item xs
                    style={{ padding: "1rem" }}
                >
                    {memo}
                </Grid>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        enigma: state.enigma,
        account: state.account,
        memo: state.memo
    }
}

export default connect(mapStateToProps, {setMemo})(Memo);
