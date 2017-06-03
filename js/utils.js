var utils = (function() {

	var getFileExtension = function(file) {
		var regex = /\.([0-9a-z]+)$/i;
		var matches = regex.exec(file);
		if (matches) {
			return matches[1];
		}
		return null;
	};

	var saveUserData = function(key, value) {
		var username = Cookies.get("username");
		if (!username) {
			return;
		}
		localStorage[username + "." + key] = value;
	}

	var loadUserData = function(key) {
		var username = Cookies.get("username");
		if (!username) {
			return;
		}
		return localStorage[username + "." + key];
	}

	return {
		getFileExtension: getFileExtension,
		saveUserData: saveUserData,
		loadUserData: loadUserData,
	} 

})();
