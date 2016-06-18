import React from 'react'
import RequestMixin from './../mixins/requests.js'

export default React.createClass({
	displayName: 'AccountPage',
	mixins: [RequestMixin],
	propTypes: {
 		page: React.PropTypes.object
 	},
	getInitialState: function() {
	    return {
	    	section: 'USER_INFO'
	    };
	},
	setSection: function(nextSection) {
		if(nextSection && typeof nextSection == 'string') {
			this.setState({
				section: nextSection
			});
		}
	},
	renderUserInfo: function() {
		if(this.props.page && this.props.page.state.user && this.state.section == 'USER_INFO') {
			return (
				<div>
					{this.props.page.state.user.name.first}
					{this.props.page.state.user.name.last}
					{this.props.page.state.user.gender}
				</div>
			);
		}
	},
	renderUserCart: function() {
		if(this.props.page && this.props.page.state.user && this.state.section == 'USER_CART') {
			return (
				<div className="cart-container">
					{this.props.page.state.cart.map((item, itemIndex) => {
						return (
							this.renderCartItem(item)
						);
					})}
				</div>
			);
		}
		
	},
	renderCartItem: function(item) {
		console.log(item);
		return (
			<div className="cart-item">
				{item._id}
				{item.size}
			</div>
		);
	},
	renderUserOptions: function () {
		if(this.props.page && this.props.page.state.user && this.state.section == 'USER_OPTIONS') {
			return (
				<div>
					Options
				</div>
			);
		}
	},
	render: function () {
		return (
			<div className="content-container">
				<div className="content-controls">
					<ul className="content-controls-button-container">
						<li className="control-button cursor-on-hover" onClick={this.setSection.bind(null, 'USER_INFO')}>User Info</li>
						<li className="control-button cursor-on-hover" onClick={this.setSection.bind(null, 'USER_CART')}>User Cart</li>
						<li className="control-button cursor-on-hover" onClick={this.setSection.bind(null, 'USER_OPTIONS')}>Options</li>
					</ul>
				</div>
				<div className="section-container">
					{this.renderUserInfo()}
					{this.renderUserCart()}
					{this.renderUserOptions()}
				</div>
			</div>
		);
	}
});

 