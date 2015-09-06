"use strict";

var Api = {
	getBio(userName){
		userName = userName.toLowerCase().trim();
		var url = `https://api.github.com/users/${userName}`;
		return fetch(url)
			.then((response) => response.json());
	},
	getRepos(userName){
		userName = userName.toLowerCase().trim();
		var url = `https://api.github.com/users/${userName}/repos`;
		return fetch(url)
			.then((response) => response.json());
	},
	getNotes(userName){
		userName = userName.toLowerCase().trim();
		var url = `https://ghnotetakerex.firebaseio.com/${userName}.json`;
		return fetch(url).then((data) => data.json());
	},
	addNote(userName, note){
		userName = userName.toLowerCase().trim();
		var url = `https://ghnotetakerex.firebaseio.com/${userName}.json`;
		return fetch(url, {
			method: 'POST',
			body: JSON.stringify(note)
		}).then((note) => note.json());
	}
};

module.exports = Api;