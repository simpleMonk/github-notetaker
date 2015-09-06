"use strict";

var React = require('react-native');
var {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	ActivityIndicatorIOS
	} = React;

//components and utils
var Api = require("../utils/Api");
var Dashboard = require("./Dashboard");

var Main = React.createClass({
	getInitialState(){
		this.state = {
			isLoadingGithubDetails: false,
			githubUserName: '',
			error: false
		};
		return this.state;
	},
	handleChange(event){
		this.setState({
			githubUserName: event.nativeEvent.text
		})
	},
	handleSubmit(event){
		this.setState({
			isLoadingGithubDetails: true
		});

		Api.getBio(this.state.githubUserName)
			.then((response) => {
				if(response.message==='Not Found'){
					this.setState({
						error:'User not found',
						isLoadingGithubDetails: false
					})
				}else{
					this.props.navigator.push({
						title:response.name|| 'Select an options',
						component:Dashboard,
						passProps:{userInfo:response}
					});

					this.setState({
						isLoadingGithubDetails: false,
						githubUserName: '',
						error: false
					});
				}
			});

	},
	render(){
		var showErr = (
			this.state.error ? <Text> {this.state.error} </Text> : <View></View>
		);
		return (
			<View style={styles.mainContainer}>
				<Text style={styles.title}>Search for Github Users</Text>
				<TextInput
					style={styles.searchInput}
					onChange={(event) => this.handleChange(event)}
					value={this.state.githubUserName}/>
				<TouchableHighlight
					style={styles.button}
					onPress={(event) => this.handleSubmit(event)}
					underlayColor="white">
					<Text style={styles.buttonText}> Search </Text>
				</TouchableHighlight>
				<ActivityIndicatorIOS
					animating={this.state.isLoadingGithubDetails}
					color="#111"
					size="large"></ActivityIndicatorIOS>
				{showErr}
			</View>
		)
	}
});

var styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		padding: 30,
		marginTop: 65,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#48BBEC'
	},
	title: {
		marginBottom: 20,
		fontSize: 25,
		textAlign: 'center',
		color: '#fff'
	},
	searchInput: {
		height: 50,
		padding: 4,
		marginRight: 5,
		fontSize: 23,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 8,
		color: 'white'
	},
	buttonText: {
		fontSize: 18,
		color: '#111',
		alignSelf: 'center'
	},
	button: {
		height: 45,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	}
});

module.exports = Main;