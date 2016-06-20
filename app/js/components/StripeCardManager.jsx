import React from 'react';
import { Link } from 'react-router';
import RequestMixin from './../mixins/requests.js';
import UtilityMixin from './../mixins/utility.js';


 export default React.createClass({
 	displayName: 'StripeCardManager',
	mixins: [RequestMixin, UtilityMixin],
	propTypes: {
	    page: React.PropTypes.object
	},
	getInitialState: function() {
	    return {
	    	section: 'CARD_OVERVIEW',
	    	selectedCard: null
	    };
	},
	setSection: function(nextSection) {
		if(nextSection && typeof nextSection == 'string') {
			this.setState({
				section: nextSection
			});
		}
	},
	validateCardDetails: function(e){
		e.preventDefault();
		var $form = $('#stripe-form');

		var cardNum = $('#card-number').val();
        var cardMonth = $('#card-month').val();
       	var cardYear = $('#card-year').val();
       	var cardCVC = $('#card-cvc').val();
			
		// First submit the card information to Stripe to get back a token
		Stripe.card.createToken({
	        number: cardNum,
           	exp_month: cardMonth,
           	exp_year: cardYear,
           	cvc: cardCVC
		}, (status, response) => {
	        var token = response.id
	        this.createNewStripeCard(token);
		});
	},
	createNewStripeCard: function(token) {
		this.createNewStripeCardRequest(token)
		.then((data) => {
			this.props.page.getStripeAccount()
		});
	},
	
	setSelectedCard: function(card){
		if(card) {
			var newOrder = this.props.page.state.order;

			newOrder.card = card;

			this.props.page.setState({
				order: newOrder
			});
		}
	},
	renderCurrentCards: function() {
		if(this.props.page.state.stripeAccount.sources && this.state.section == 'CARD_OVERVIEW'){
			return (
				<div className="new-card-form-container">
					<div className="current-cards-container">
						{this.props.page.state.stripeAccount.sources.data.map((card, cardIndex) => {
							return (
								<div key={card.last4} 
									 className="card-item" 
									 style={(this.props.page.state.order.card == card) ? {backgroundColor: 'lightblue'} :{}}
									 onClick={() => {
										this.setSelectedCard(card)
									}}>
									<div className="card-last-4">
										{card.last4}
									</div>
									<div className="card-type">
										{card.brand.toUpperCase()}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			);
		}
	},
	renderNewCreditCardForm: function() {
		if(this.state.section == 'NEW_CARD') {
			return (
				<div className="new-card-form-container">
					<form id="stripe-form" className="new-card-form" onSubmit={this.validateCardDetails}>
						<label>Card Number:</label> <br/><input className="new-card-input" id="card-number" placeholder="Card Number"/><br/>
						<label>Month</label><br/><input className="new-card-input" id="card-month" placeholder="Exp Month"/><br/>
						<label>Year</label><br/><input className="new-card-input" id="card-year" placeholder="Exp Year"/><br/>
						<label>CVC</label><br/><input className="new-card-input" id="card-cvc" placeholder="CVC"/><br/>
						<input type="submit"/>
					</form>
					
				</div>
			);
		}
	},	
	render: function () {
		if(this.props.page) {
			return (
				<div className="card-manager-container">
				<div>
					<div className="small-button"
						 style={{display: 'inline-block'}} 
					     onClick={() => {
							this.setSection('NEW_CARD')
						}}>
						Add New
					</div>
					<div className="small-button" 
						 style={{display: 'inline-block'}} 
					     onClick={() => {
							this.setSection('CARD_OVERVIEW')
						}}>
						Cards
					</div>
				</div>
					{this.renderNewCreditCardForm()}
					{this.renderCurrentCards()}
				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	}
});

 