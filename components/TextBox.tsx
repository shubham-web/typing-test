import styled, { css } from "styled-components";
import { getWords } from "../utils";
const TEXT = `We've just begun to learn about the water and its secrets, just as we've only touched on
outer space. We don't entirely rule out the possibility that there might`;
const TextBox: React.FC = () => {
	return (
		<Border>
			<Background>
				<Content>
					<Words>
						{getWords(TEXT).map((word, index) => {
							return (
								<Word
									wrong={word === "begun"}
									highlighted={word === "about"}
									correct={index <= 4}
									key={index}
								>
									{word}
								</Word>
							);
						})}
					</Words>
				</Content>
			</Background>
		</Border>
	);
};
export default TextBox;

const Border = styled.div`
	z-index: 2;
	padding: 1px;
	background-image: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(33, 38, 47) 100%);
	border-radius: 3rem;
`;
const Background = styled.div`
	background-color: #0d1117;
	border-radius: 3rem;
`;
const Content = styled.div`
	color: #465d80;
	padding: 3rem;
	font-size: 1.8rem;
`;

const Words = styled.div`
	display: flex;
	flex-wrap: wrap;
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
			color: #70839f;
			background-color: #000000;
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
