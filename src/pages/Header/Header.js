import React from 'react';
import { Link } from 'react-router';
import {Main} from "../MainPage/Main";

var Header = React.createClass({
    render: function() {

        return (
            <div className="header">
                <p className="header-info">
                    Merhaba
                </p>

                <div>
                    <Main/>
                </div>

                <div className="menu">
                    <Link to="/movies" className="menu-link-item" activeClassName="active">Filmler</Link>
                    <Link to="/players" className="menu-link-item" activeClassName="active">Oyuncular</Link>
                </div>
            </div>
    );
    }
});

export default Header;