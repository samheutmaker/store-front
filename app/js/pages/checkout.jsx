import React from 'react'
import RequestMixin from './../mixins/requests.js'
import CartSmall from './../components/CartSmall.jsx'
import StripeCardManager from './../components/StripeCardManager.jsx'
import ShippingAddress from './../components/ShippingAddress.jsx'
import { Link } from 'react-router';

export default React.createClass({
	displayName: 'CheckoutPage',
	mixins: [RequestMixin],
	propTypes: {
 		page: React.PropTypes.object
 	},
	getInitialState: function() {
	    return {
	    	section: 'CHECKOUT_OVERVIEW',
	    };
	},
	setSection: function(nextSection) {
		if(nextSection && typeof nextSection == 'string') {
			this.setState({
				section: nextSection
			});
		}
	},
	renderCheckoutOverview: function(){
		if(this.state.section == 'CHECKOUT_OVERVIEW'){
			return (
				<div className="checkout-container">
					<div className="small-button" 
						 style={{float: 'right'}}
						 onClick={this.setSection.bind(null, 'CHECKOUT_PAYMENT')}>
						Next
					</div>
					<h2>
						Cart
					</h2>
					<CartSmall 
						page={this.props.page}
					/>
		
				</div>
			);
		}
	},
	renderCheckoutPayment: function() {
		if(this.state.section == 'CHECKOUT_PAYMENT'){
			return (
				<div className="checkout-container">
					<div className="small-button" 
						 style={{float: 'left'}}
						 onClick={this.setSection.bind(null, 'CHECKOUT_OVERVIEW')}>
						BACK
					</div>
					<div className="small-button" 
						 style={{float: 'right'}}
						 onClick={this.setSection.bind(null, 'CHECKOUT_PROMOTIONS')}>
						Next
					</div>
					<h2>
						Checkout Payment
					</h2>
					<div style={{width: '50%', float: 'left', position: 'relative', top: '19px'}}>
						<ShippingAddress
							page={this.props.page}
							canSetAddress={true}
						/>
					</div>

					<StripeCardManager
						page={this.props.page}
					/>
				
					
				</div>
			);
		}	
	},
	renderCheckoutPromotions: function(){
		if(this.state.section == 'CHECKOUT_PROMOTIONS'){
			return (
				<div className="checkout-container">
					<div className="small-button" 
						 style={{float: 'left'}}
						 onClick={this.setSection.bind(null, 'CHECKOUT_PAYMENT')}>
						BACK
					</div>
					<div className="small-button" 
						 style={{float: 'right'}}
						 onClick={this.setSection.bind(null, 'CHECKOUT')}>
						Next
					</div>
					<h2>
						Checkout Promotions
					</h2>
				</div>
			);
		}
	},
	renderCheckout: function(){
		if(this.state.section == 'CHECKOUT'){
			return (
				<div className="checkout-container">
					<div className="small-button" 
						 style={{float: 'left'}}
						 onClick={this.setSection.bind(null, 'CHECKOUT_PROMOTIONS')}>
						BACK
					</div>
					<h2>
						Checkout
					</h2>
				</div>
			);
		}
	},
	render: function () {
		return (
			<div className="content-container">
				<div className="section-container">
					<div className="max-width-container">
						{this.renderCheckoutOverview()}
						{this.renderCheckoutPayment()}
						{this.renderCheckoutPromotions()}
						{this.renderCheckout()}
					</div>
				</div>
			</div>
		);
	}
});

 