const avgWPM = 250;

const timeToRead = (text: string) => {
	const words = text.trim().split(" ").length;
	const time = Math.ceil(words / avgWPM);
	return time;
};

export default timeToRead;
