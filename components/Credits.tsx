import styled, { keyframes } from "styled-components";
import CoolBox from "./CoolBox";

const Credits: React.FC = () => {
	return (
		<Wrapper>
			<CoolBox radius="2rem 2rem 0 0">
				<Content>
					<a tabIndex={-1} href="https://github.com/shubham-web/typing-test" target="_blank" rel="noreferrer">
						<Button>Code</Button>
					</a>
					<a tabIndex={-1} href="https://twitter.com/shubhamp_web" target="_blank" rel="noreferrer">
						<Button>Twitter</Button>
					</a>
					<a tabIndex={-1} href="https://www.buymeacoffee.com/shubhamp" target="_blank" rel="noreferrer">
						<Button>Support</Button>
					</a>
				</Content>
			</CoolBox>
		</Wrapper>
	);
};

const FadeUp = keyframes`
    from{
        transform: translateY(500px);
    }
    to{
        transform: translateY(0px);
    }
`;

const Wrapper = styled.div`
	position: absolute;
	bottom: 0;
	right: 2rem;
	@media (max-height: 660px) {
		display: none;
	}
	& > * {
		animation: ${FadeUp} 0.5s;
	}
	overflow: hidden;
`;

const Button = styled.button`
	padding: 0.8rem 1.5rem;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 1rem;
	border: 0.1rem ridge #4b5e7c;
	border-top: none;
	border-left: none;
	font-size: 1rem;
	font-family: var(--default-font);
	color: #88a5d3;
	&:hover,
	&:focus {
		color: lightblue;
	}

	outline: none;
	&:focus {
		box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.2);
	}
`;
const Content = styled.div`
	padding: 1.5rem;
	display: flex;
	gap: 0.5rem;
`;
const ContentHeading = styled.span``;

export default Credits;
