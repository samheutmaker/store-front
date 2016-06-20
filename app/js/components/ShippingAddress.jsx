import React from 'react';
import { Link } from 'react-router';
import RequestMixin from './../mixins/requests.js';
import UtilityMixin from './../mixins/utility.js';


 export default React.createClass({
 	displayName: 'ShippingAddress',
	mixins: [RequestMixin, UtilityMixin],
	propTypes: {
	    page: React.PropTypes.object,
	    canSetAddress: React.PropTypes.bool
	},
	getInitialState: function() {
	    return {
	          section: 'CURRENT_ADDRESSES',
	          newAddress: {},
	          editAddress: {},
	    };
	},
	setSection: function(nextSection) {
		if(nextSection && typeof nextSection == 'string') {
			this.setState({
				section: nextSection
			});
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
	updateUserShippingAddress: function(){
		if(Object.keys(this.state.editAddress).length) {
			this.updateUserShippingAddressRequest(this.state.editAddress)
			.then((data) => {
				this.props.page.getAllUserShippingAddresses();
				console.log(data);
			});
		}
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
	setOrderAddress: function(address) {
		var newOrder = this.props.page.state.order;
		newOrder.address = address;
		this.props.page.setState({
			order: newOrder
		});
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
											 onClick={this.setEditAddress.bind(null, address)}
											 style={{display: 'inline-block'}}
											 >
											Edit
										</div>
										<div className="small-button" 
											 onClick={this.setOrderAddress.bind(null, address)}
											 style={(this.props.canSetAddress) ? {display: 'inline-block'} : {display: 'none'}}
											 >
											Select
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
	setEditAddress: function(address) {
		if(address) {
			this.setState({
				editAddress: address
			}, () => {
				this.setSection('EDIT_ADDRESS')
			});
		}
	},
	renderEditUserAddress: function() {
		if(this.state.section == 'EDIT_ADDRESS') {
			return (
				<div className="address-items-container">
					<input onChange={(e) => {this.updateEditUserAddress(e, 'fullName')}} value={this.state.editAddress.fullName} placeholder="fullName"/>
					<input onChange={(e) => {this.updateEditUserAddress(e, 'street')}} value={this.state.editAddress.street} placeholder="street"/>
					<input onChange={(e) => {this.updateEditUserAddress(e, 'city')}} value={this.state.editAddress.city} placeholder="city"/>
					<input onChange={(e) => {this.updateEditUserAddress(e, 'suite')}} value={this.state.editAddress.suite} placeholder="suite"/>
					<input onChange={(e) => {this.updateEditUserAddress(e, 'state')}} value={this.state.editAddress.state} placeholder="state"/>
					<input onChange={(e) => {this.updateEditUserAddress(e, 'zip')}} value={this.state.editAddress.zip} placeholder="zip"/>
					<input onChange={(e) => {this.updateEditUserAddress(e, 'phone')}} value={this.state.editAddress.phone} placeholder="phone"/>
					<input onChange={(e) => {this.updateEditUserAddress(e, 'country')}} value={this.state.editAddress.country} placeholder="country"/>
					<div className="button" onClick={this.updateUserShippingAddress}>
						Submit
					</div>
				</div>
			);
		}
	},
	updateEditUserAddress: function(e, prop) {
		if(prop && typeof prop == 'string') {
			var newEditAddress = this.state.editAddress;
			newEditAddress[prop] = e.target.value;
			this.setState({
				editAddress: newEditAddress
			}, () => {});
		}
	},
	renderAddNewAddress: function() {
		if(this.state.section == 'ADD_NEW_ADDRESS') {
			return (
				<div className="address-items-container">
					<input onChange={(e) => {this.updateNewUserAddress(e, 'fullName')}} placeholder="fullName"/>
					<input onChange={(e) => {this.updateNewUserAddress(e, 'street')}} placeholder="street"/>
					<input onChange={(e) => {this.updateNewUserAddress(e, 'city')}} placeholder="city"/>
					<input onChange={(e) => {this.updateNewUserAddress(e, 'suite')}} placeholder="suite"/>
					<input onChange={(e) => {this.updateNewUserAddress(e, 'state')}} placeholder="state"/>
					<input onChange={(e) => {this.updateNewUserAddress(e, 'zip')}} placeholder="zip"/>
					<input onChange={(e) => {this.updateNewUserAddress(e, 'phone')}} placeholder="phone"/>
					<input onChange={(e) => {this.updateNewUserAddress(e, 'country')}} placeholder="country"/>
					<div className="button" onClick={this.createNewUserShippingAddress}>
						Add
					</div>
				</div>
			);
		}
	},
	updateNewUserAddress: function(e, prop){
		if(prop && typeof prop == 'string') {
			var newAddress = this.state.newAddress;
			newAddress[prop] = e.target.value.trim();
			this.setState({
				newAddress: newAddress
			}, () => {});
		}
	},

	render: function () {
		if(this.props.page) {
			return (
				<div className="address-container">
					{this.renderAddressControls()}
					{this.renderAddresses()}
					{this.renderAddNewAddress()}
					{this.renderEditUserAddress()}
				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	}
});

 