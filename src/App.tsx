import React, { Component } from 'react';
import './App.css';
import { Grid, Cell } from "styled-css-grid";
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import FindCamera from './components/FindCamera/FindCamera';

class App extends Component<{}, {}> {
    constructor(props: {}) {
     super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <div>
                <Grid
                    columns={"1fr"}
                    rows={"65px 1fr 45px"}
                    areas={[
                        "header",
                        "content",
                        "footer"
                    ]}>
                    <Cell area="header">
                        <Header></Header>
                    </Cell>
                    <Cell area="content">
                        <Content></Content>
                        <FindCamera/>
                    </Cell>
                    <Cell area="footer">Footer</Cell>
                </Grid>
            </div>
        );
    }
}

export default App;
