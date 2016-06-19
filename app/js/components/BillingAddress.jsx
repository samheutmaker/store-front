import React from 'react';
import { Link } from 'react-router';
import RequestMixin from './../mixins/requests.js';
import UtilityMixin from './../mixins/utility.js';


 export default React.createClass({
 	displayName: 'BillingAddress',
	mixins: [RequestMixin, UtilityMixin],
	propTypes: {
	    page: React.PropTypes.object
	},
	getInitialState: function() {
	    return {
	          section: 'CURRENT_ADDRESSES',
	          newAddress: {},
	    };
	},
	setSection: function(nextSection) {
		if(nextSection && typeof nextSection == 'string') {
			this.setState({
				section: nextSection
			});
		}
	},
	updateNew: function(e, prop){
		if(prop && typeof prop == 'string') {
			var newAddress = this.state.newAddress;
			newAddress[prop] = e.target.value.trim();
			this.setState({
				newAddress: newAddress
			}, () => {});
		}
	},
	createNewUserShippingAddress: function(){
		this.createNewUserShippingAddressRequest(this.state.newAddress)
		.then((data) => {
			this.props.page.getAllUserShippingAddresses();
		});
	},
	removeUserShippingAddress: function(address) {
		if(address && address._id) {
			this.removeUserShippingAddressRequest(address._id)
			.then((data) => {
				this.props.page.getAllUserShippingAddresses();
			});
		}
	},
	editUserShippingAddress: function() {

	},
	editAddress: function() {

	},
	renderAddressControls: function() {
		return (
			<div className="address-controls-container">
				<div className="button" style={{margin: '10px 10px', float: 'left'}} onClick={this.setSection.bind(null, 'CURRENT_ADDRESSES')}>
					View
				</div>
				<div className="button" style={{margin: '10px 10px', float: 'left'}} onClick={this.setSection.bind(null, 'ADD_NEW_ADDRESS')}>
					Add
				</div>
			</div>
		);
	},
	renderAddresses: function() {
		if(this.props.page.state.userShipping && this.props.page.state.userShipping.length) {
			if(this.state.section == 'CURRENT_ADDRESSES'){
				return (
					<div className="address-items-container">
						{this.props.page.state.userShipping.map((address, addressIndex) => {
							return (
								<div className="address-item">
									<div className="address-item-prop-container">
										<div className="address-item-prop">{address.fullName}</div>
										<div className="address-item-prop">{address.street} {(address.suite) ? ' suite ' + address.suite : null}</div>
										<div className="address-item-prop">{address.city}, {address.state}</div>
										<div className="address-item-prop">{address.zip}</div>
										<div className="address-item-prop">{address.country}</div>
										<div className="address-item-prop">{address.phone}</div>
									</div>
									<div className="address-item-controls">
										<div className="small-button" 
											 onClick={this.removeUserShippingAddress.bind(null, address)}
											 style={{display: 'inline-block'}}
											 >
											Remove
										</div>
										<div className="small-button" 
											 onClick={this.editAddress.bind(null, address)}
											 style={{display: 'inline-block'}}
											 >
											Edit
										</div>
									</div>

								</div>
							);
						})}
					</div>
				);
			} 
		} else {
			return (
				<div>No Items. </div>
			);	
		}
	},
	renderAddNewAddress: function() {
		if(this.state.section == 'ADD_NEW_ADDRESS') {
			return (
				<div className="address-items-container">
					<input onChange={(e) => {this.updateNew(e, 'fullName')}} placeholder="fullName"/>
					<input onChange={(e) => {this.updateNew(e, 'street')}} placeholder="street"/>
					<input onChange={(e) => {this.updateNew(e, 'city')}} placeholder="city"/>
					<input onChange={(e) => {this.updateNew(e, 'suite')}} placeholder="suite"/>
					<input onChange={(e) => {this.updateNew(e, 'state')}} placeholder="state"/>
					<input onChange={(e) => {this.updateNew(e, 'zip')}} placeholder="zip"/>
					<input onChange={(e) => {this.updateNew(e, 'phone')}} placeholder="phone"/>
					<input onChange={(e) => {this.updateNew(e, 'country')}} placeholder="country"/>
					<div className="button" onClick={this.createNewUserShippingAddress}>
						Add
					</div>
				</div>
			);
		}
	},

	render: function () {
		if(this.props.page) {
			return (
				<div className="address-container">
					{this.renderAddressControls()}
					{this.renderAddresses()}
					{this.renderAddNewAddress()}
				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	}
});

 