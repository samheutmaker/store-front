import React from 'react'
import Dropzone from 'react-dropzone'

import SlideShow from './../components/SlideShow.jsx'

import RequestMixin from './../mixins/requests.js'
import UtilityMixin from './../mixins/utility.js'


export default React.createClass({
	displayName: 'AdminPage',
	mixins: [RequestMixin, UtilityMixin],
	propTypes: {
		page: React.PropTypes.object
	},
	getInitialState: function() {
	    return {
	    	section: 'ADMIN_PRODUCTS',
	    	subSection: 'ADMIN_PRODUCTS_OVERVIEW',
	    	activeProduct: {},
	    	activeProductIsNew: false,
	    	files: []
	    };
	},
	setSection: function(section, cb) {
		if(section && typeof section == 'string') {
			this.setState({
				section: section,
				subSection: null
			}, () => {
				(cb && typeof cb == 'function') ? cb() : null;
			});
		}
	},
	setSubSection: function(section, cb) {
		if(section && typeof section == 'string') {
			this.setState({
				subSection: section
			}, () => {
				(cb && typeof cb == 'function') ? cb() : null;
			});
		}
	},
	setActiveProduct: function(product, isNew) {
		if(typeof product == 'object'){

			this.setState({
				activeProduct: product,
				activeProductIsNew: isNew
			});	
		} 
	},
	createNewProduct: function() {
		if(Object.keys(this.state.activeProduct).length > 7) {
			this.createNewProductRequest(this.state.activeProduct)
			.then((data) => {
				console.log(data);
				this.props.page.loadAll();
			});
		} else {
			console.log('Missing Params');
		}
	},
	updateProduct: function() {
		if(Object.keys(this.state.activeProduct).length > 7) {
			this.updateProductRequest(this.state.activeProduct)
			.then((data) => {
				this.props.page.loadAll();
			});
		} else {
			console.log('Missing Params');
		}
	},
	removeProduct: function(product){
		if(product && product._id && product.stripe_id) {

			var postData = {
				product_id: product._id,
				stripe_id: product.stripe_id
			};

			this.removeProductRequest(postData)
			.then((data) => {
				this.props.page.loadAll();
			});
		}
	},
	addProductMedia: function() {
		if(this.state.media && this.state.media.length) {

		}
	},
	updateActiveProduct: function(value, prop, key) {
		if(typeof value == 'string' && prop && typeof prop == 'string') {
			var newProduct = this.state.activeProduct;
			newProduct.edited = true;

			if(typeof key == 'number') {
				if(!newProduct[prop]) newProduct[prop] = [];
				newProduct[prop][key] = value;
			} else if(typeof key == 'string'){
				if(!newProduct[prop]) newProduct[prop] = {};
				newProduct[prop][key] = value;
			}else {
				newProduct[prop] = value;
			}

			this.setState({
				activeProduct: newProduct
			});
		}
	},
	addTagToActiveProduct: function(cb) {
		var newActiveProduct = this.state.activeProduct;
		if(!newActiveProduct.tags) newActiveProduct.tags = [];

		newActiveProduct.tags.push('new tag');

		this.setState({
			activeProduct: newActiveProduct
		});
	},

	renderAdminNavigation: function() {
		var emptyObj = {};
		return (
			<div className="admin-nav">
				<div className="button" onClick={this.setSection.bind(null, 'ADMIN_PRODUCTS')}>
					Products
				</div>
				<div className="button" onClick={this.setSection.bind(null, 'ADMIN_ORDERS')}>
					Orders
				</div>
				<div className="button" 
					 style={(this.state.section == 'ADMIN_PRODUCTS') ? {} : {display: 'none'}}
					 onClick={this.setActiveProduct.bind(null, emptyObj, true)}>
					New Product
				</div>
			
			</div>
		);
	},
	renderCurrentProducts: function() {
		if(this.state.section == 'ADMIN_PRODUCTS' ) {
			if(this.props.page.state.products && this.props.page.state.products.length) {
				return (
					<div className="current-products-container">
						<div className="inside">
							{this.props.page.state.products.map((product, productIndex) => {
								return (
									<div className="current-product" key={productIndex}>
										{product.name}
										<div style={{position: 'absolute', right: '20px'}}>
											<div className="small-button"  style={(product.edited) ? {display: 'inline-block', backgroundColor: '#2980b9'} : {display: 'none'}} onClick={this.updateProduct}>Save</div>
											<div className="small-button"  style={{display: 'inline-block'}} onClick={this.removeProduct.bind(null)}>View</div>
											<div className="small-button"  style={{display: 'inline-block'}} onClick={this.setActiveProduct.bind(null, product, false)}>Edit</div>
											
											<div className="small-button"  style={{display: 'inline-block', backgroundColor: '#c0392b'}} onClick={this.removeProduct.bind(null, product)}>Remove</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				);
			} else  {
				return (
					<div className="current-products-container">
						No Items
					</div>
				);
			}
		} 
	},
	renderActiveProduct: function() {
		if( this.state.section == 'ADMIN_PRODUCTS') {
			if(this.state.activeProductIsNew || Object.keys(this.state.activeProduct).length) {
				return (
					<div className="active-product-container">
						<h2 style={(this.state.activeProductIsNew) ? {} : {display: 'none'}}>Add Product</h2>
						<h2 style={(this.state.activeProductIsNew) ? {display: 'none'} : {}}>Edit Product</h2>
						<div className="active-product">
							<form className="active-product-form" onSubmit={this.createNewProduct}>
								<input  className="" 
										placeholder="Name"
										value={this.state.activeProduct.name}
										onChange={(e) => {
											this.updateActiveProduct(e.target.value, 'name')
										}}
								/>
								<input  className="" 
										placeholder="SKU"
										value={this.state.activeProduct.SKU}
										onChange={(e) => {
											this.updateActiveProduct(e.target.value, 'SKU')
										}}
								/>
								<input  className="" 
										placeholder="Description"
										value={this.state.activeProduct.desc}
										onChange={(e) => {
											this.updateActiveProduct(e.target.value, 'desc')
										}}
								/>
								<input  className="" 
										placeholder="Cost"
										value={this.state.activeProduct.cost}
										onChange={(e) => {
											this.updateActiveProduct(e.target.value, 'cost')
										}}
								/>
								<input  className="" 
										placeholder="Gender"
										value={this.state.activeProduct.gender}
										onChange={(e) => {
											this.updateActiveProduct(e.target.value, 'gender')
										}}
								/>
					
								<input  className="" 
										placeholder="Season"
										value={this.state.activeProduct.season}
										onChange={(e) => {
											this.updateActiveProduct(e.target.value, 'season')
										}}
								/>
								<input  className="" 
										placeholder="type"
										value={this.state.activeProduct.type}
										onChange={(e) => {
											this.updateActiveProduct(e.target.value, 'type')
										}}
								/>

								{this.renderActiveProductTags(this.state.activeProduct.tags)}
								<div className="small-button" onClick={this.addTagToActiveProduct}>Add Tag</div>
								
							</form>
					
								{this.renderActiveProductSizesContainer(this.state.activeProduct.sizes)}
								
								
						</div>
						<div style={{position: 'absolute', top: '450px', left: '250px'}}>
									<div className="button" onClick={() => {
										(this.state.activeProductIsNew) ? this.createNewProduct() : null;
									}}>
										{((this.state.activeProductIsNew) ? 'Create' : 'Save')}	
									</div>
								</div>

						
					</div>
				);
			} else {
				return (
					<div>
						Select an item to view.
					</div>
				);
			}
		}
	},
	onDrop: function (files) {
		var formData = new FormData();

		files.forEach((file, fileIndex) => {
			console.log(file);
			formData.append(fileIndex, file);
		});

      	this.addProductMediaRequest(formData, this.state.activeProduct._id, files.length)
      	.then((res) => {
      		console.log(res);
      	});
    },
    onOpenClick: function () {
      this.refs.dropzone.open();
    },
    renderActiveProductMediaContainer: function() {
    	var media = this.state.activeProduct.media;

    	if(media && media.length) {
	    	return (
	    		<SlideShow 
	    			page={this.props.page}
	    			mediaArray={media}
	    		/>
	    	);
    	}
    },
	renderAddProductMediaContainer: function() {
			return (
				<div className="add-images-container">
					<Dropzone ref="dropzone" onDrop={this.onDrop}>
                    	<div>Try dropping some files here, or click to select files to upload.</div>
                	</Dropzone>
	                <button type="button" onClick={this.onOpenClick}>
	                    Open Dropzone
	                </button>
	                {this.state.files.length > 0 ? <div>
	                <h2>Uploading {this.state.files.length} files...</h2>
	                <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
	                </div> : null}

				</div>
			);
	},
	renderActiveProductTags: function(tagsArray) {
		if(tagsArray && tagsArray.length) {
			return (
				<div className="tags-container">
					{tagsArray.map((tag, tagIndex) => {
						return (
							<input  className="" 
									placeholder="tag"
									value={tag}
									onChange={(e) => {
										this.updateActiveProduct(e.target.value, 'tags', tagIndex)
									}}
							/>
						);
					})}
				</div>
			);
		}
	},
	renderActiveProductSizesContainer: function(sizes) {	
		return(
			<div className="active-product-sizes">
				{this.renderActiveProductSizes(sizes)}
					<div className="small-button" onClick={this.updateActiveProduct()}>Add Size</div>
					<form onSubmit={(e) => {
						e.preventDefault();
						var val = e.target[0].value;
						this.updateActiveProduct('0', 'sizes', val);
					}}>
						<input  className="" 
							placeholder="new size"
						/>
						<input type="submit"/>
					</form>
			</div>
		);
	},
	renderActiveProductSizes: function(sizes) {
		if(sizes && Object.keys(sizes).length) {
			return (
				<span>
				{Object.keys(sizes).map((size, sizeIndex) => {
					return (
						<div className="active-product-size" key={sizeIndex}>
							<input  className=""
							placeholder="size"
							value={size}
							/>
							<input  className=""
							placeholder="quantity"
							value={sizes[size]}
							onChange={(e) => {
							this.updateActiveProduct(e.target.value, 'sizes', size)
							}}
							/>
						</div>
					);
				})}	
				</span>
			);
		}
	},
	renderOrders: function(){
		if(this.state.section == 'ADMIN_ORDERS') {
			return (
				<div className="">Orders Page</div>
			);	
		}
	},
	render: function () {
		if(true) {
			return (
				<div className="content-container">
					{this.renderAdminNavigation()}
					{this.renderCurrentProducts()}
					<div className="50-percent width">
						{this.renderActiveProduct()}
					</div>
					<div className="width 50-percent">
						{this.renderActiveProductMediaContainer()}
					</div>
					{this.renderOrders()}
				</div>
			);
		} else {
			return (
				<div>nothing</div>
			)
		}
	}
});

 