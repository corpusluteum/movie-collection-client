import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import MainTemplate from './pages/MainTemplate';
import Movies from './pages/Movies';
import Players from './pages/Players';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={MainTemplate}>
			<Route path="movies" components={{main: Movies}} />
			<Route path="players" components={{main: Players}} />
		</Route>
	</Router>,
	document.getElementById('root')
);
