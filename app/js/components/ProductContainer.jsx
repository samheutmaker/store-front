import React from 'react';
import { Link } from 'react-router';
import RequestMixin from './../mixins/requests.js';
import UtilityMixin from './../mixins/utility.js';


 export default React.createClass({
 	displayName: 'ProductContainer',
	mixins: [RequestMixin, UtilityMixin],
	propTypes: {
	    page: React.PropTypes.object.isRequired
	},
	renderProduct: function(product){
		if(product) {
			return(
				<div key={product._id} className="product-item-container">
					<Link to={'/product/' + product._id}>
						<div className="product-item">
							{product.name}
						</div>
					</Link>
				</div>
			);
		}
	},
	render: function () {
		if(this.props.page.state.products && this.props.page.state.products.length) {
			return (
				<div className="max-width-container">
					<div className="product-container">
						{this.props.page.state.products.map((product, productItem) => {
							return (
								this.renderProduct(product)
							);
						})}
					</div>
				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	}
});

 