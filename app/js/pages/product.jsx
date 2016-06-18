import React from 'react';

export default React.createClass({
	displayName: 'ProductDetailPage',
	propTypes: {
		page: React.PropTypes.object
	},
	getInitialState: function() {
	    return {
	  		activeItem: this.props.page.state.productsHash[this.props.params.id]
	    };
	},
	componentWillReceiveProps: function() {
	      this.setState(this.getInitialState());
	},
	renderChooseSize: function(product) {
		return (
			<div className="detail-sizes-container">
				{product.sizes.map((size, sizeIndex) => {
					return (
						<div key={size} className="detail-size">
							{size}
						</div>
					);
				})}
			</div>
		);
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
							</div>
							<div className="actions">
								
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

 