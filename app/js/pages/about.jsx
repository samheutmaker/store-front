import React from 'react';
import RequestMixin from './../mixins/requests.js';

export default React.createClass({
	displayName: 'AboutPage',
	mixins: [RequestMixin],
	propTypes: {
 		page: React.PropTypes.object
 	},
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

 