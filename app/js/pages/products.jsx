import React from 'react';
import RequestMixin from './../mixins/requests.js';
import UtilityMixin from './../mixins/utility.js';
import ProductContainer from './../components/ProductContainer.jsx'

export default React.createClass({
	displayName: 'ProductPage',
	mixins: [RequestMixin, UtilityMixin],
	propTypes: {
		page: React.PropTypes.object
	},
	getInitialState: function() {
	    return {

	    };
	},
	renderBanner: function() {
		return (
			<div className="banner-container">
				<h1 className="banner-caption">Make a statement with our Fall 2016 Collection</h1>
			</div>
		);
	},
	renderProducts: function() {
		if(this.props.page) {
			return(
				<div >
					<ProductContainer
						page={this.props.page}
					/>
				</div>
			);
		}
	},
	render: function () {
		if(true) {
			return (
				<div className="content-container">
					{this.renderBanner()}
					{this.renderProducts()}
				</div>
			);
		} else {
			return (
				<div>nothing</div>
			)
		}
	}
});

 