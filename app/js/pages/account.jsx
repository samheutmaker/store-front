import React from 'react'
import RequestMixin from './../mixins/requests.js'
import ShippingAddress from './../components/ShippingAddress.jsx'
import StripeCardManager from './../components/StripeCardManager.jsx'
import OrderHistory from './../components/OrderHistory.jsx'
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
	    	section: 'USER_CART'
	    };
	},
	setSection: function(nextSection) {
		console.log(nextSection);
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
	renderUserInfo: function() {
		if(this.state.section == 'USER_INFO') {
			return (
				<div className="square-container">
				User Account
				</div>
			);
		}
	},
	renderUserOrderHistory: function() {
		if(this.state.section == 'USER_ORDER_HISTORY') {
			if(this.props.page) {
				return (
					<OrderHistory 
						page={this.props.page}
					/>
				);
			} else {
				return (
					<div className="">NO Order History</div>
				);
			}
		}
	},
	renderUserBilling: function() {
		if(this.state.section == 'USER_BILLING') {
			if(this.props.page && this.props.page.state.stripeAccount) {
				return (
					<div className="square-container">
						<StripeCardManager
							page={this.props.page}
						/>	
					</div>
				);
			} else {	
				return (
					<div>There was an error. No Stripe Account found.</div>
				);
			}
		}
	},
	renderUserShipping: function() {
		if(this.state.section == 'USER_SHIPPING') {
			return (
				<div className="square-container">
					<ShippingAddress
						page={this.props.page}
					/>
				</div>
			);
		}
	},
	renderUserSettings: function() {
		if(this.state.section == 'USER_SETTINGS') {
			return (
				<div className="square-container">
				USER SETTINGS
				</div>
			);
		}
	},
	render: function () {
		return (
			<div className="content-container">
				<div className="account-nav-container">
					<ul className="account-nav-list">
						<li className="account-button cursor-on-hover" style={(this.state.section == 'USER_CART') ? {color: '#CDE3F9'} : {}} onClick={this.setSection.bind(null, 'USER_CART')}>Cart</li>
						<li className="account-button cursor-on-hover" style={(this.state.section == 'USER_INFO') ? {color: '#CDE3F9'} : {}} onClick={this.setSection.bind(null, 'USER_INFO')}>Account</li>
						<li className="account-button cursor-on-hover" style={(this.state.section == 'USER_ORDER_HISTORY') ? {color: '#CDE3F9'} : {}} onClick={this.setSection.bind(null, 'USER_ORDER_HISTORY')}>Order History</li>
						<li className="account-button cursor-on-hover" style={(this.state.section == 'USER_BILLING') ? {color: '#CDE3F9'} : {}} onClick={this.setSection.bind(null, 'USER_BILLING')}>Billing</li>
						<li className="account-button cursor-on-hover" style={(this.state.section == 'USER_SHIPPING') ? {color: '#CDE3F9'} : {}} onClick={this.setSection.bind(null, 'USER_SHIPPING')}>Shipping</li>
						<li className="account-button cursor-on-hover" style={(this.state.section == 'USER_SETTINGS') ? {color: '#CDE3F9'} : {}} onClick={this.setSection.bind(null, 'USER_SETTINGS')}>Settings</li>

					</ul>
				</div>
				<div className="account-section-container">
					{this.renderUserCart()}
					{this.renderUserInfo()}
					{this.renderUserOrderHistory()}
					{this.renderUserBilling()}
					{this.renderUserShipping()}
					{this.renderUserSettings()}
				</div>
			</div>
		);
	}
});

 