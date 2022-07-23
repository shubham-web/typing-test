import React, { KeyboardEvent, KeyboardEventHandler, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppState } from "../data";
import { TypingStatus } from "../data/defaultState";
import { RefreshIcon } from "../src/svgs/common";
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
					{result.correct} out of {result.correct + result.wrong} words correctly.{" "}
					{result.accuracy > 80 ? "🎉" : ":("}
				</Result>
				<RestartButton onClick={handleRefresh}>
					<RefreshIcon width={30} height={30} fill="#5a5a5a" />
				</RestartButton>
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
	margin: 1.75rem 0;
	color: #7b889d;
`;
const Wpm = styled.span`
	font-size: 3rem;
	margin-right: 1rem;
	color: dodgerblue;
`;
const Accuracy = styled.span`
	font-size: 1.5rem;
	margin: 0;
`;
const RestartButton = styled.button`
	font-size: 1.5rem;
	font-family: var(--default-font);
	padding: 1rem;
	line-height: 0;
	border-radius: 1rem;
	border: none;
	background-color: transparent;
	outline: none;
	color: #99a9c2;
	border: 1px solid #99a9c250;
`;

export default ResultScreen;
