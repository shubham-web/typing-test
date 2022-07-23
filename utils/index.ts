import padStart from "lodash/padStart";
import sampleSize from "lodash/sampleSize";
export const getWords = (text: string): string[] => {
	let words = text.split(" ");
	words = words.filter((w) => w !== "");
	return words;
};

export const getWordsFromQuotes = (quotesArray: QuotesArray) => {
	let selectedQuotes = sampleSize(quotesArray, 10);
	let text = selectedQuotes.join(" ");
	return getWords(text);
};

export const getTimerLabel = (seconds: number) => {
	let minutesString = padStart(parseInt(((seconds / 60) | 0).toString()).toString(), 2, "0");
	let secondsString = padStart((seconds % 60).toString(), 2, "0");
	return `${minutesString}:${secondsString}`;
};

export const getPercentage = (marks: number, total: number, float?: boolean) => {
	return ((marks / total) * 100) | 0;
};
