import React from 'react';
import RequestMixin from './../mixins/requests.js';
import UtilityMixin from './../mixins/utility.js';

export default React.createClass({
	displayName: 'ProductDetailPage',
	mixins: [RequestMixin, UtilityMixin],
	propTypes: {
		page: React.PropTypes.object
	},
	getInitialState: function() {
	    return {
	  		activeItem: this.props.page.state.productsHash[this.props.params.id],
	  		size: 'M',
	  		quantity: 1
	    };
	},
	renderChooseSize: function(product) {
		return (
			<div className="detail-sizes-container">
				{product.sizes.map((size, sizeIndex) => {
					return (
						<div 
						key={size} 
						style={(this.state.size == size.toUpperCase()) ? {backgroundColor: 'red'} : {}}
						className="detail-size" 
						onClick={() => {
							this.setState({
								size: size.toUpperCase()
							});
						}}>
							{size}
						</div>
					);
				})}
			</div>
		);
	},
	renderChooseQuantity: function() {
		return (
			<div className="quantity-container">
				<div className="quantity-button" onClick={() => {
					this.setState({
						quantity: (this.state.quantity > 0) ? this.state.quantity - 1 : this.state.quantity
					})
				}}>-</div>
				<div className="quantity">{this.state.quantity}</div>
				<div className="quantity-button" onClick={() => {
					this.setState({
						quantity: this.state.quantity + 1
					})
				}}>+</div>
			</div>
		);
	},
	renderAddButton: function() {
		return (
			<div className="add-item-button" onClick={this.addItemToCart}>
				Add To Cart
			</div>
		);
	},
	addItemToCart: function() {
		if(this.state.quantity > 0) {
			var postData = {
				itemId: this.state.activeItem._id,
				size: this.state.size,
				quantity: this.state.quantity
			};

			this.addItemToCartRequest(postData)
			.then((data) => {
				this.props.page.setState({
					cart: data
				});
			});
		}
	},
	render: function () {
		if(this.state.activeItem) {
			console.log(this.state.activeItem);
			return (
				<div className="content-container">
					<div className="max-width-container">
						<div className="detail-slide-show">
							
						</div>
						<div className="detail-info">
							<div className="name">
								{this.state.activeItem.name}
							</div>
							<div className="desc">
								{this.state.activeItem.gender}
							</div>
							<div className="options">
								{this.renderChooseSize(this.state.activeItem)}
								{this.renderChooseQuantity()}
							</div>
							<div className="actions">
								{this.renderAddButton()}
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div></div>
			)
		}
	}
});

 