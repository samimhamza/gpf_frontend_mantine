const getNameAbbr = (name: string) => {
	var words = name.split(" ");
	var capitalizedLetters = "";
	for (var i = 0; i < words.length; i++) {
		capitalizedLetters += words[i].charAt(0).toUpperCase();
	}
	return capitalizedLetters;
};

export { getNameAbbr };
