import styled from "styled-components";
const InputBox: React.FC = () => {
	return (
		<Wrapper>
			<WordInput autoFocus placeholder="Start Typing" />
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
`;
