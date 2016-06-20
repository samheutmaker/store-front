import React from 'react';
import { Link } from 'react-router';
import RequestMixin from './../mixins/requests.js';
import UtilityMixin from './../mixins/utility.js';


 export default React.createClass({
 	displayName: 'StripeCardManager',
	mixins: [RequestMixin, UtilityMixin],
	propTypes: {
	    page: React.PropTypes.object
	},
	getInitialState: function() {
	    return {
	    	section: 'CARD_OVERVIEW',
	    	selectedCard: null
	    };
	},
	componentDidMount: function() {

	},
	submitOrder: function() {
		if(this.props.page.state.order.card && this.props.page.state.order.address) {
			
			var postData = {
				amount: this.props.page.makeCartTotal * 100,
				source: this.props.page.state.order.card,
				address: this.props.page.state.order.address,
				cart: this.props.page.state.cart
			};

			this.submitOrderRequest(postData)
			.then((data) => {
				console.log(data)
			});
		}
	},
	setSection: function(nextSection) {
		if(nextSection && typeof nextSection == 'string') {
			this.setState({
				section: nextSection
			});
		}
	},

	render: function () {
		if(this.props.page) {
			return (
				<div className="checkout-container">
					
				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	}
});

 