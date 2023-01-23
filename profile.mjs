
export const color = (elm, data) => {
	if (elm.grade === "Learner") {
		if (data >= 42) return `card-title`;
		else if (data >= 15) return `card-title-yellow`;
		else if (data <= 0) return `card-title-BH`;
		else return `card-title-red`;
	} else return `card-title`;
}

export const countDays = (elem, data) =>{
	if (elem.grade === "Learner") {
		if (data >= 2) return `${data} days`;
		else if (data === 1 || data === 0) return `${data} day`;
		else return `BH`;
	} else return elem.level.toFixed(2);
}

export const profile = (elm) =>{
	return elm.user.location == null ? "Unavailable" : elm.user.location;
}

export const checkImage = (data) =>{
	if (data.user.first_name === "3b3")
		return "https://cdn.intra.42.fr/users/default.png";
	else if (data.user.login === "aerragha")
		return `https://i.ibb.co/zQSXt1r/1582996860869.jpg`;
	else return data.user.image.link;
};

export const printName = (elm) =>{
	if (elm.grade === "Learner")
		return `${elm.user.login}</br>${elm.level.toFixed(2)}`;
	else return `${elm.user.login}</br>`;
};

// export { color, countDays, profile, checkImage, printName }