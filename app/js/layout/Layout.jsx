import React from 'react';
import { Link } from 'react-router';

 export default React.createClass({
	getInitialState: function() {
	    return {
	         someShit: true
	    };
	},
	componentDidMount: function() {
	},
	render: function () {
		return (
			<div className="page-container">
				<nav>
					<ul className="nav-button-list">
						<li className="nav-button">
							<Link to="home">
								Home
							</Link>
						</li>
						<li className="nav-button">
							<Link to="about">
								Home
							</Link>
						</li>
						<li className="nav-button">
							<Link to="home">
								Home
							</Link>
						</li>
					</ul>
				</nav>
				{this.props.children}
			</div>
		);
	}
});

 