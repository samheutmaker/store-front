import React from 'react';
import ReactDOM from 'react-dom'

 module.exports = React.createClass({
	getInitialState: function() {
	    return {
	         someShit: true
	    };
	},
	componentDidMount: function() {
	     console.log('Layout mounted');
	},
	render: function () {
		return (
			<div>That is some shit homie</div>
		);
	}
});

 