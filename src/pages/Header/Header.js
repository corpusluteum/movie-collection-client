import React from 'react';
import { Link } from 'react-router';


var Header = React.createClass({
    render: function() {

        return (
            <div className="header">
                <p className="header-info">
                    Merhaba
                </p>
                <div className="menu">
                    <Link to="/home" className="menu-link-item" activeClassName="active">Filmler</Link>
                    <Link to="/movies" className="menu-link-item" activeClassName="active">Yönetim Film</Link>
                    <Link to="/players" className="menu-link-item" activeClassName="active">Yönetim Oyuncu</Link>
                </div>
            </div>
    );
    }
});

export default Header;