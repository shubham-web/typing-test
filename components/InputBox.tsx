import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppState, useDispatch } from "../data";
import { ActionTypes } from "../data/appReducer";
import { TypingStatus } from "../data/defaultState";
interface Props {
	handleFinished: () => void;
}
const InputBox: React.FC<Props> = ({ handleFinished }) => {
	const [text, setText] = useState("");
	const state = useAppState();
	const dispatch = useDispatch();

	useEffect(() => {
		if (state.dirty === false) {
			// clear input text on test refresh
			setText("");
		}
	}, [state.dirty]);

	const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		let value = e.target.value.trim();
		if (value.length > 0 && !state.dirty) {
			dispatch({ type: ActionTypes.SET_DIRTY, payload: true });
		}
		setText(value);
	};

	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		let isCharacterKey = e.key.length === 1;

		let value = text.concat(isCharacterKey ? e.key : "").trim();

		if ([" ", "Enter"].includes(e.key) && value.length > 0) {
			e.preventDefault();

			let correct = value === state.words[state.currentWord];

			const finished = state.currentWord === state.words.length - 1;

			// Change color of word depending on correctness
			dispatch({
				type: ActionTypes.SET_WORD_STATUS,
				index: state.currentWord,
				status: correct ? TypingStatus.CORRECT : TypingStatus.WRONG,
			});

			// Set current word to the next word
			dispatch({ type: ActionTypes.SET_WORD_STATUS, index: state.currentWord + 1, status: TypingStatus.CURRENT });

			setText("");

			if (finished) {
				handleFinished();
			}
		}
	};
	return (
		<Wrapper>
			<WordInput
				value={text}
				autoFocus
				placeholder={state.dirty ? "" : "Start Typing"}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
			/>
		</Wrapper>
	);
};
export default InputBox;

const Wrapper = styled.div`
	z-index: 1;
	display: flex;
	justify-content: center;
	padding-top: 1rem;
`;
const WordInput = styled.input`
	border: 1px solid rgba(69, 80, 97, 0.8);
	border-radius: 1rem;
	font-size: 1.5rem;
	padding: 1.25rem 1.6rem;
	outline: none;
	background-color: rgb(0, 0, 0);
	color: #70839f;
	font-family: var(--default-font);
	box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2), 0 0 5px rgba(255, 255, 255, 0.2);
	width: 60%;
	&:focus {
		box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
	}
	@media (max-width: 768px) {
		width: 90%;
	}
`;
