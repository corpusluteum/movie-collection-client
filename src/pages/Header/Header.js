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
                    <Link to="/" className="menu-link-item" activeClassName="active">Filmler</Link>
                    <Link to="/movies" className="menu-link-item" activeClassName="active">Yönetim Film</Link>
                    <Link to="/players" className="menu-link-item" activeClassName="active">Yönetim Oyuncu</Link>
                </div>
            </div>
    );
    }
});

export default Header;