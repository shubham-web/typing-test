import { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { useAppState, useDispatch } from "../data";
import { ActionTypes } from "../data/appReducer";
import { RefreshIcon } from "../src/svgs/common";
import { getTimerLabel } from "../utils";

interface Props {
	handleRefresh: () => void;
}
const Stats: React.FC<Props> = ({ handleRefresh }) => {
	const state = useAppState();
	const dispatch = useDispatch();

	// Start Timer when user starts typing (i.e. state is dirty)
	useEffect(() => {
		if (state.dirty && state.timer.id === 0) {
			let timerId = window.setInterval(() => {
				dispatch({ type: ActionTypes.CHANGE_REMAINING_TIME, payload: -1 });
			}, 1000);
			dispatch({ type: ActionTypes.SET_TIMER, payload: { id: timerId } });
		}

		// Terminate timer when another test is initialized
		if (!state.dirty && state.timer.id) {
			let timerId = state.timer.id;
			window.clearInterval(timerId);
			dispatch({ type: ActionTypes.SET_TIMER, payload: { id: 0 } });
		}
	}, [state.dirty, state.timer.id, dispatch]);

	useEffect(() => {
		if (state.finished && state.timer.id !== 0) {
			let timerId = state.timer.id;
			window.clearInterval(timerId);
			dispatch({ type: ActionTypes.SET_TIMER, payload: { id: 0 } });
		}
	}, [state.finished, state.timer.id, dispatch]);

	return (
		<Wrapper>
			<Timer blinking={state.timer.remaining <= 5}>{getTimerLabel(state.timer.remaining)}</Timer>
			<Refresh onClick={handleRefresh}>
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

const Blinking = keyframes`
    from{
        color: #7b1a1a;
    }
    to{
        color: #c22121;
    }
`;

const Timer = styled.span<{
	blinking: boolean;
}>`
	color: #6a6b00;
	font-size: 1.5rem;
	${(props) =>
		props.blinking &&
		css`
			animation-name: ${Blinking};
			animation-duration: 0.4s;
			animation-timing-function: linear;
			animation-direction: alternate;
			animation-iteration-count: 15;
		`}
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
