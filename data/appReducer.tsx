import { Reducer } from "react";
import defaultState, { AppState, TypingStatus } from "./defaultState";

export enum ActionTypes {
	INIT = "INIT",
	SET_WORD_STATUS = "SET_WORD_STATUS",
	SET_DIRTY = "SET_DIRTY",
	SET_TIMER = "SET_TIMER",
	CHANGE_REMAINING_TIME = "DECREASE_TIME",
	FINISHED = "FINISHED",
	RESET = "RESET",
}

const appReducer: Reducer<AppState, Action> = (prevState, action) => {
	switch (action.type) {
		case ActionTypes.INIT: {
			prevState.timer.remaining = prevState.timer.total;
			let words = action.payload.words;

			return {
				...prevState,
				words: words,
				currentWord: 0,
				typingStatus: [TypingStatus.CURRENT, ...Array(words.length - 1).fill(TypingStatus.CLEAN)],
				dirty: false,
				finished: false,
			};
		}
		case ActionTypes.SET_WORD_STATUS: {
			if (action.index < prevState.typingStatus.length) {
				prevState.typingStatus[action.index] = action.status;
			}

			return {
				...prevState,
				...(action.status === TypingStatus.CURRENT ? { currentWord: action.index } : {}),
			};
		}
		case ActionTypes.SET_DIRTY: {
			return {
				...prevState,
				dirty: action.payload,
			};
		}
		case ActionTypes.SET_TIMER: {
			return {
				...prevState,
				timer: {
					...prevState.timer,
					...action.payload,
				},
			};
		}
		case ActionTypes.CHANGE_REMAINING_TIME: {
			let updatedSeconds = prevState.timer.remaining + action.payload;
			updatedSeconds = updatedSeconds < 0 ? 0 : updatedSeconds;
			if (updatedSeconds === 0) {
				prevState.finished = true;
				prevState.dirty = false;
			}
			return {
				...prevState,
				timer: {
					...prevState.timer,
					remaining: updatedSeconds,
				},
			};
		}
		case ActionTypes.FINISHED: {
			return {
				...prevState,
				finished: true,
				dirty: false,
			};
		}
		case ActionTypes.RESET: {
			return defaultState;
		}
		default: {
			return prevState;
		}
	}
};

export type Action =
	| { type: ActionTypes.RESET }
	| { type: ActionTypes.FINISHED }
	| { type: ActionTypes.INIT; payload: { words: string[] } }
	| { type: ActionTypes.SET_WORD_STATUS; index: WordIndex; status: TypingStatus }
	| { type: ActionTypes.SET_DIRTY; payload: boolean }
	| { type: ActionTypes.SET_TIMER; payload: Partial<typeof defaultState.timer> }
	| { type: ActionTypes.CHANGE_REMAINING_TIME; payload: number };

export default appReducer;
