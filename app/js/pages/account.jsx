import React from 'react';
import RequestMixin from './../mixins/requests.js';

export default React.createClass({
	displayName: 'AccountPage',
	mixins: [RequestMixin],
	propTypes: {
 		page: React.PropTypes.object
 	},
	getInitialState: function() {
	    return {};
	},
	componentDidMount: function() {
		this.getUserCart().then((res) => {
			console.log(res);
		});
	},
	renderUserInfo: function() {
		if(this.props.page && this.props.page.state.user) {
			return (
				<div>
					{this.props.page.state.user.name.first}
					{this.props.page.state.user.name.last}
					{this.props.page.state.user.gender}
				</div>
			);
		}
	},
	render: function () {
		return (
			<div className="content-container">
				{this.renderUserInfo()}
			</div>
		);
	}
});

 