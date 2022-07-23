import { useEffect } from "react";
import styled, { css } from "styled-components";
import { useAppState } from "../data";
import { TypingStatus } from "../data/defaultState";
import CoolBox from "./CoolBox";

const TextBox: React.FC = () => {
	let state = useAppState();

	useEffect(() => {
		let currentWordNode = document.querySelector(`[data-currentword="true"]`);
		if (currentWordNode) {
			currentWordNode.scrollIntoView(true);
		}
	}, [state.currentWord]);

	return (
		<CoolBox>
			<Content>
				{state.words.length > 0 ? (
					<Words>
						{state.words.slice(0, state.currentWord + 30).map((word, index) => {
							return (
								<Word
									{...(state.typingStatus[index] === TypingStatus.CURRENT
										? { "data-currentword": "true" }
										: {})}
									wrong={state.typingStatus[index] === TypingStatus.WRONG}
									highlighted={state.typingStatus[index] === TypingStatus.CURRENT}
									correct={state.typingStatus[index] === TypingStatus.CORRECT}
									key={index}
								>
									{word}
								</Word>
							);
						})}
					</Words>
				) : (
					"Loading…"
				)}
			</Content>
		</CoolBox>
	);
};
export default TextBox;

const Content = styled.div`
	user-select: none;
	color: #465d80;
	padding: 3rem;
	font-size: 1.8rem;
`;

const Words = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-height: 9rem;
	line-height: 3rem;
	overflow: hidden;
	scroll-behavior: smooth;
`;
const Word = styled.div<{
	highlighted?: boolean;
	correct?: boolean;
	wrong?: boolean;
}>`
	padding: 0 0.5rem;
	border-radius: 5px;

	${(props) =>
		props.highlighted &&
		css`
			color: #99a9c2;
			background-color: #000000;
			box-shadow: 0 0 3px #ffffff20;
		`}

	${(props) =>
		props.correct &&
		css`
			color: #2c723d;
		`}

    ${(props) =>
		props.wrong &&
		css`
			color: #581b1b;
		`}
`;
