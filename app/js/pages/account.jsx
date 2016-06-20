import React from 'react'
import RequestMixin from './../mixins/requests.js'
import ShippingAddress from './../components/ShippingAddress.jsx'
import CartSmall from './../components/CartSmall.jsx'
import { Link } from 'react-router';

export default React.createClass({
	displayName: 'AccountPage',
	mixins: [RequestMixin],
	propTypes: {
 		page: React.PropTypes.object
 	},
	getInitialState: function() {
	    return {
	    	section: 'USER_INFO',
	    	subSection: 'USER_INFO'
	    };
	},
	setSection: function(nextSection) {
		if(nextSection && typeof nextSection == 'string') {
			this.setState({
				section: nextSection
			});
		}
	},
	setSubSection: function(nextSubSection) {
		if(nextSubSection && typeof nextSubSection == 'string') {
			this.setState({
				subSection: nextSubSection
			});
		}
	},
	renderUserInfo: function() {
		if(this.props.page && this.props.page.state.user && this.state.section == 'USER_INFO') {

			return (
				<div>
					<div className="content-controls">
						<ul className="content-controls-button-container">
							<li className="control-button cursor-on-hover" onClick={this.setSubSection.bind(null, 'USER_INFO')}>Billing</li>
							<li className="control-button cursor-on-hover" onClick={this.setSubSection.bind(null, 'USER_ADDRESSES')}>Addresses</li>
							<li className="control-button cursor-on-hover" onClick={this.setSubSection.bind(null, 'USER_SETTINGS')}>Settings</li>
						</ul>
					</div>
					<div className="cart-contaienr">
						{this.renderUserInfoSub()}
						{this.renderUserInfoAddress()}
						{this.renderUserInfoSettings()}
					</div>
				</div>
			);
		}
	},
	renderUserInfoSub: function() {
		if(this.state.section == 'USER_INFO' && this.state.subSection == 'USER_INFO') {
			return (
				<div className="cart-container">
				USER INFO
				</div>
			);
		}
	},
	renderUserInfoAddress: function() {
		if(this.state.section == 'USER_INFO' && this.state.subSection == 'USER_ADDRESSES') {
			return (
				<div className="cart-container">
					<ShippingAddress
						page={this.props.page}
					/>
				</div>
			);
		}
	},
	renderUserInfoSettings: function() {
		if(this.state.section == 'USER_INFO' && this.state.subSection == 'USER_SETTINGS') {
			return (
				<div className="cart-container">
				USER SETTINGS
				</div>
			);
		}
	},
	renderUserCart: function() {
		if(this.props.page && this.props.page.state.user && this.state.section == 'USER_CART') {
			return (
				<div>
					<Link to="/checkout">
						<div className="button">
							Checkout
						</div>
					</Link>
					<CartSmall 
						page={this.props.page}
					/>
				</div>
			);
		}
		
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

 