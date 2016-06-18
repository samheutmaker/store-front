import React from 'react';
import ProductContainer from './../components/ProductContainer.jsx'

export default React.createClass({
	displayName: 'HomePage',
	propTypes: {
		page: React.PropTypes.object
	},
	getInitialState: function() {
	    return {
	         someShit: true
	    };
	},
	renderProducts: function() {
		if(this.props.page) {
			return(
				<div>
					<ProductContainer
						page={this.props.page}
					/>
				</div>
			);
		}
	},
	render: function () {
		return (
			<div className="content-container">
				{this.renderProducts()}
			</div>
		);
	}
});

 