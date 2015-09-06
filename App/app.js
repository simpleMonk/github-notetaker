/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	NavigatorIOS,
	} = React;

//App components
var Main = require('./components/Main');

/**
 * Main Component
 */
var ReactNativeExample = React.createClass({
	render: function() {
		return (
			<NavigatorIOS
				style={styles.container}
				initialRoute={{
				title:'Github Note maker',
				component:Main}}/>
		);
	}
});

/**
 * Style sheet
 * @type {*|Object|{panHandlers}|{type, property}|{duration, create, update}|Config}
 */
var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#111111'
	}
});

module.exports = ReactNativeExample;
