import React, { KeyboardEvent, KeyboardEventHandler, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppState } from "../data";
import { TypingStatus } from "../data/defaultState";
import { getPercentage } from "../utils";
import CoolBox from "./CoolBox";

interface Props {
	handleRefresh: () => void;
}
interface Result {
	wpm: number;
	accuracy: number;
	correct: number;
	wrong: number;
}

const ResultScreen: React.FC<Props> = ({ handleRefresh }) => {
	const state = useAppState();

	const [result, setResult] = useState<Result>({
		wpm: 0,
		accuracy: 0,
		correct: 0,
		wrong: 0,
	});

	// Calculate Result
	useEffect(() => {
		let typedWords = {
			correct: state.typingStatus.filter((stts) => stts === TypingStatus.CORRECT).length,
			wrong: state.typingStatus.filter((stts) => stts === TypingStatus.WRONG).length,
		};
		let result = {
			...typedWords,
			accuracy: getPercentage(typedWords.correct, typedWords.correct + typedWords.wrong),
			wpm: typedWords.correct,
		};

		setResult(result);
	}, [state.typingStatus]);

	useEffect(() => {
		const handleEnter: EventListener = (ev) => {
			if ((ev as unknown as KeyboardEvent).key === "Enter") {
				handleRefresh();
			}
		};

		document.addEventListener("keydown", handleEnter);

		return () => {
			document.removeEventListener("keydown", handleEnter);
		};
	}, [handleRefresh]);

	return (
		<CoolBox>
			<Content>
				<Wpm>{result.wpm} WPM</Wpm>
				<Accuracy>{result.accuracy}% Accuracy</Accuracy>
				<Result>
					{result.accuracy > 80 ? "Awesome!" : "Uh oh!"} You {result.accuracy < 80 ? "only" : ""} typed{" "}
					{result.correct} words correctly out of {result.correct + result.wrong}, with {result.wpm} words per
					minute speed.
					<br /> Your accuracy was {result.accuracy}%. {result.accuracy > 85 ? "Congratulations!" : ""}
				</Result>
				<RestartButton onClick={handleRefresh}>Press &quot;Enter&quot; to Start Another Test</RestartButton>
			</Content>
		</CoolBox>
	);
};

const Content = styled.div`
	padding: 3rem;
	font-size: 1.25rem;
	text-align: center;
	color: #99a9c2;
`;
const Result = styled.h1`
	font-weight: normal;
	font-size: 1.25rem;
	color: #99a9c2;
	text-align: center;
`;
const Wpm = styled.span`
	font-size: 3rem;
	margin-right: 1rem;
`;
const Accuracy = styled.span`
	font-size: 2rem;
	opacity: 0.6;
`;
const RestartButton = styled.button`
	font-size: 1.5rem;
	font-family: var(--default-font);
	padding: 0.6rem 1rem;
	border-radius: 0.5rem;
	border: none;
	color: #99a9c2;
	background-color: #000000;
	outline: none;
`;

export default ResultScreen;
