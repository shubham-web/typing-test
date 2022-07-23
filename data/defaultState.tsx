// types
export enum TypingStatus {
	CLEAN,
	CURRENT,
	WRONG,
	CORRECT,
}

export interface AppState {
	timer: {
		id: number;
		total: number;
		remaining: number;
	};
	words: string[];
	currentWord: WordIndex;
	typingStatus: TypingStatus[];
	dirty: boolean;
	finished: boolean;
}

const defaultState: AppState = {
	timer: {
		id: 0,
		remaining: 60,
		total: 60,
	},
	words: [],
	currentWord: 0,
	typingStatus: [],
	dirty: false,
	finished: false,
};

export default defaultState;
