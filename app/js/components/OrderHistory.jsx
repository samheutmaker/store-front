import React from 'react';
import { Link } from 'react-router';
import RequestMixin from './../mixins/requests.js';
import UtilityMixin from './../mixins/utility.js';


 export default React.createClass({
 	displayName: 'OrderHistory',
	mixins: [RequestMixin, UtilityMixin],
	propTypes: {
	    page: React.PropTypes.object
	},
	componentDidMount: function() {
		if(!this.props.page.state.allUserOrderHistory) {
			this.props.page.getAllUserOrderHistory()
		      .then(() => {
		      	console.log(this.props.page.state.allUserOrderHistory);
		      });	
		}
	},
	getInitialState: function() {
	    return {};
	},
	renderOrderHistory: function() {
		if(this.props.page.state.allUserOrderHistory && this.props.page.state.allUserOrderHistory.length) {
			return (
				<ul>
					{this.props.page.state.allUserOrderHistory.map((order, orderIndex) => {
						return this.renderOrderItem(order)
					})}
				</ul>
			);	
		}
		
	},
	renderOrderItem: function(order) {

		var date = new Date(order.dateCreated);
		var month = date.getMonth();
		var day = date.getDay();
		var year = date.getFullYear();

		var finalDate = month + '/' + day + '/' + year;

		if(order) {
			return (
				<div key={order._id} className="order-item">
					You purchased {order.cart.length} {(order.cart.length == 1) ? ' item ' :  ' items '} on {finalDate}
				</div>
			);	
		}
		
	},
	render: function () {
		if(this.props.page) {
			return (
				<div className="square-container">
					{this.renderOrderHistory()}
				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	}
});

 