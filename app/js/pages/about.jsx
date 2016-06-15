import React from 'react';

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
			<div className="content-container">
				The about page
			</div>
		);
	}
});

 