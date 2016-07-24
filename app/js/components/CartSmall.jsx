import React from 'react';
import { Link } from 'react-router';
import RequestMixin from './../mixins/requests.js';
import UtilityMixin from './../mixins/utility.js';


 export default React.createClass({
 	displayName: 'CartSmall',
	mixins: [RequestMixin, UtilityMixin],
	propTypes: {
	    page: React.PropTypes.object
	},
	getInitialState: function() {
	    return {};
	},
	removeItemFromCart: function(item){
		if(item.item_id && item.size) {
			var postData = {
				itemId: item.item_id,
				size: item.size
			};
			this.removeItemFromCartRequest(postData)
			.then((data) => {
				this.props.page.setState({
					cart: data
				});
			});
		}
	},
	renderUserCart: function() {

		if(this.props.page && this.props.page.state.user && this.props.page.state.cart && this.props.page.state.cart.length) {
			return (
				<div className="square-container">
					{this.props.page.state.cart.map((item, itemIndex) => {
						return (
							this.renderCartItem(item)
						);
					})}
				</div>
			);
		} else {
			return (
				<div className="square-container">
					You have no items in your cart!
				</div>
			);
		}
		
	},
	renderCartItem: function(item) {

		var imageUrl = (item.item.media.length) ? item.item.media[0].imageUrlHash['-small'] : null;

		return (
			<div key={item._id} className="cart-item">
				<div className="cart-item-image">
					<img src={imageUrl} 
						 height="100px" 
						 width="100px"
						 style={(imageUrl) ? {} : {display: 'none'}}/>
				</div>
				<div className="cart-item-name">{item.item.name}</div>
				<Link to={'/product/' + item.item._id}>
					<div className="click-link">View Item</div>
				</Link>
				<div className="click-link cursor-on-hover" onClick={this.removeItemFromCart.bind(null, item)}>Remove Item</div>
				<br/>
				<div className="cart-item-size">Size: {item.size}</div>
				<div className="cart-item-quantity">Number: {item.quantity}</div>
				<div className="cart-item-cost">Cost: ${item.item.cost}.00</div>
			</div>
			
		);
	},
	render: function () {
		if(this.props.page) {
			return (
				<div>
					{this.renderUserCart()}
				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	}
});

 