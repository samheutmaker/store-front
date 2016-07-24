import React from 'react';
import { Link } from 'react-router';
import RequestMixin from './../mixins/requests.js';
import UtilityMixin from './../mixins/utility.js';


 export default React.createClass({
 	displayName: 'SlideShow',
	mixins: [RequestMixin, UtilityMixin],
	propTypes: {
	    page: React.PropTypes.object,
	    containerStyles: React.PropTypes.object,
	    mediaArray: React.PropTypes.array.isRequired
	},
	getInitialState: function() {
	    return {
	    	currentImageUrl: (this.props.mediaArray[0]) ? this.props.mediaArray[0].imageUrlHash['-large'] : null
	    };
	},
	componentDidMount: function() {
		var newState = {};

		if(this.props.mediaArray && this.props.mediaArray.length) {
			newState.smallImages = this.props.mediaArray.map((media) => {return media.imageUrlHash['-small']});
			newState.largeImages = this.props.mediaArray.map((media) => {return media.imageUrlHash['-large']});
		}

		this.setState(newState);
	},
	componentWillReceiveProps: function(nextProps) {
	    if(nextProps.mediaArray[0]) {
	    	this.setState({
	    		currentImageUrl: (nextProps.mediaArray[0]) ? nextProps.mediaArray[0].imageUrlHash['-large'] : null
	    	})
	    }  
	},
	renderCurrentImage: function() {
		if(this.state.currentImageUrl) {
			return (
				<div className="current-image">
					<img height="100%" width="100%" src={this.state.currentImageUrl} />
				</div>
			);
		} else{
			return (
				<div className="current-image">
					Select Image Below
				</div>
			);
		}
	},
	renderImageSelect: function() {
		if(this.props.mediaArray && this.props.mediaArray.length) {

			console.log(this.props.mediaArray);

			var allImages = this.props.mediaArray.map((mediaItem, mediaItemIndex) => {
				return mediaItem.imageUrlHash['-large'];
			});

			console.log(allImages);

			return (
				<div className="image-select-container">
					{allImages.map((mediaItem, mediaItemIndex) => {
						
						
							return (
								<img key={mediaItem}
									 className="cursor-on-hover" 
									 src={mediaItem} 
									 width="100px" height="100px" 
									 onClick={() => this.selectImageUrl(mediaItem)} 
									 />
							);
					}).filter((itemNull) => {return !!itemNull})}
				</div>
			);
		}
	},
	selectImageUrl: function(imageUrl, cb, cbParams) {
		if(imageUrl && typeof imageUrl == 'string') {
			this.setState({	
				currentImageUrl: imageUrl
			}, () => {
				if(cb && typeof cb == 'function') {
					cb(cbParams);
				}
			});
		} else {
			console.log('Improper params.');
		}
	},
	render: function () {
		if(this.props.page) {
			return (
				<div className="slide-show-container" style={(this.props.containerStyles) ? this.props.containerStyles : {}}>
					{this.renderCurrentImage()}
					{this.renderImageSelect()}
				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	}
});

 