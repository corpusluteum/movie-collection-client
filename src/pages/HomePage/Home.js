import React from 'react';

import {Main} from "../MainPage/Main";

var Home = React.createClass({

    getInitialState: function() {
        return {

        }
    },

    render: function() {

        return (
            <div>
                <Main/>
            </div>
        );
    }
});

export default Home;