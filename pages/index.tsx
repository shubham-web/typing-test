import type { NextPage } from "next";
import Head from "next/head";
import NextImage from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import InputBox from "../components/InputBox";
import ResultScreen from "../components/ResultScreen";
import Stats from "../components/Stats";
import TextBox from "../components/TextBox";
import { useAppState, useDispatch } from "../data";
import { ActionTypes } from "../data/appReducer";
import { getWordsFromQuotes } from "../utils";

const Home: NextPage = () => {
	const quotes = useRef<QuotesArray>([]);

	const state = useAppState();
	const dispatch = useDispatch();

	const initTest = useCallback(
		(quotes: QuotesArray) => {
			dispatch({
				type: ActionTypes.INIT,
				payload: {
					words: getWordsFromQuotes(quotes),
				},
			});
		},
		[dispatch]
	);

	const handleFinished = useCallback(() => {
		if (!state.finished) {
			dispatch({ type: ActionTypes.FINISHED });
		}
	}, [state.finished, dispatch]);

	const handleRefresh = useCallback(() => {
		initTest(quotes.current);
	}, [initTest]);

	useEffect(() => {
		fetch("/quotes.json")
			.then((e) => e.json())
			.then((arr: QuotesArray) => {
				quotes.current = arr;
				initTest(quotes.current);
			});
	}, [dispatch, initTest]);

	return (
		<>
			<Head>
				<title>Typing Test</title>
				<meta name="description" content="Typing test created just for fun by @shubhamp_web" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Wrapper>
				<BgEllipse>
					<NextImage src="/ellipse.png" width={3409 / 2.5} height={2735 / 2.5} />
				</BgEllipse>
				<Stats handleRefresh={handleRefresh} />
				{state.finished ? (
					<ResultScreen handleRefresh={handleRefresh} />
				) : (
					<>
						<TextBox />
						<InputBox handleFinished={handleFinished} />
					</>
				)}
			</Wrapper>
		</>
	);
};

const Wrapper = styled.main`
	position: relative;
	width: 51vw;
	display: grid;
	gap: 1rem;
	margin: 0 auto;
	padding: 5rem 0;

	@media (max-width: 1900px) {
		width: 51vw;
	}
	@media (max-width: 1600px) {
		width: 80vw;
	}
	@media (max-width: 768px) {
		width: 90vw;
	}
`;
const BgEllipse = styled.div`
	position: absolute;
	top: 60%;
	left: 10%;
	transform: translate(-50%, -50%);
	pointer-events: none;
	user-select: none;
	z-index: 1;
	width: 100%;
	@media (max-width: 768px) {
		top: 40%;
		left: 50%;
	}
`;

export default Home;
