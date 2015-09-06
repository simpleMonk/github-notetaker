"use strict";

var React = require('react-native');
var {
	Text,
	View,
	StyleSheet,
	WebView
	} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F6F6EF',
		flexDirection: 'column'
	}
});

var CustomeWebView = React.createClass({
	propTypes: {
		url: React.PropTypes.string.isRequired
	},
	render(){
		return (
			<View style={styles.container}>
				<WebView url={this.props.url}/>
			</View>
		);
	}
})

module.exports = CustomeWebView;