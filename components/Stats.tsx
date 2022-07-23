import styled from "styled-components";
import { RefreshIcon } from "../src/svgs/common";

const Stats: React.FC = () => {
	return (
		<Wrapper>
			<Timer>0:48</Timer>
			<Refresh>
				<RefreshIcon width={30} height={30} fill="#5a5a5a" />
			</Refresh>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;
	z-index: 1;
`;

const Timer = styled.span`
	color: #444500;
	font-size: 1.5rem;
`;

const Refresh = styled.button`
	background-color: transparent;
	border: none;
	outline: none;
	border-radius: 0.5rem;
	padding: 0.5rem 0.85rem;
	transition: background-color 0.3s;
	&:hover {
		background-color: #0d1117;
	}
	&:focus {
		box-shadow: inset 0 0 3px rgba(255, 255, 255, 0.2);
	}
`;
export default Stats;
