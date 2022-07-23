import type { NextPage } from "next";
import Head from "next/head";
import NextImage from "next/image";
import styled from "styled-components";
import InputBox from "../components/InputBox";
import Stats from "../components/Stats";
import TextBox from "../components/TextBox";

const Home: NextPage = () => {
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
				<Stats />
				<TextBox />
				<InputBox />
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
`;
const BgEllipse = styled.div`
	position: absolute;
	top: 60%;
	left: 10%;
	transform: translate(-50%, -50%);
	pointer-events: none;
	user-select: none;
	z-index: 1;
`;

export default Home;
