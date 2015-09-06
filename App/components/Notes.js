"use strict";

var React = require('react-native');

var {
	Text,
	View,
	ListView,
	TextInput,
	TouchableHighlight,
	StyleSheet
	} = React;
var Api = require('../utils/Api');
var Separator = require('./Helpers/Separator');
var Badge = require('./Badge');

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	buttonText: {
		fontSize: 18,
		color: 'white'
	},
	button: {
		height: 60,
		backgroundColor: '#48BBEC',
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center'
	},
	searchInput: {
		height: 60,
		padding: 10,
		fontSize: 18,
		color: '#111',
		flex: 10
	},
	rowContainer: {
		padding: 10,
	},
	footerContainer: {
		backgroundColor: '#E3E3E3',
		alignItems: 'center',
		flexDirection: 'row'
	}
});

var Notes = React.createClass({
	propTypes: {
		userInfo: React.PropTypes.object.isRequired,
		notes: React.PropTypes.object.isRequired
	},
	getInitialState(){
		this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
		this.state = {
			dataSource: this.ds.cloneWithRows(this.props.notes),
			note: '',
			error: ''
		}
		return this.state;
	},
	handleChange(e){
		this.setState({
			note: e.nativeEvent.text
		})
	},
	handleSubmit(){
		var note = this.state.note;
		this.setState({
			note: ''
		});
		if (this.isEmpty(note))return;
		Api.addNote(this.props.userInfo.login, note)
			.then((data) => {
				Api.getNotes(this.props.userInfo.login)
					.then((data) => {
						this.setState({
							dataSource: this.ds.cloneWithRows(data)
						})
					});
			})
			.catch((error) => {
				console.log('Request failed', error);
				this.setState({error})
			});
	},
	isEmpty(note){
		if (note === null)return true;
		if (typeof note === "string" && note.trim().length === 0) return true;
		return false;
	},
	newNoteComponent(){
		return (
			<View style={styles.footerContainer}>
				<TextInput
					style={styles.searchInput}
					value={this.state.note}
					onChange={this.handleChange.bind(this)}
					placeholder="New Note"/>
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="#88D4F5">
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableHighlight>
			</View>
		)
	},
	renderRow(rowData){
		return (
			<View>
				<View style={styles.rowContainer}>
					<Text> {rowData} </Text>
				</View>
				<Separator />
			</View>
		)
	},
	render(){
		return (
			<View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					renderHeader={() => <Badge userInfo={this.props.userInfo}/>}/>
				{this.newNoteComponent()}
			</View>
		);
	}
})

module.exports = Notes;