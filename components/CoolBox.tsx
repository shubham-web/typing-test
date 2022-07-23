import React from "react";
import styled from "styled-components";

const CoolBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Border>
			<Background>{children}</Background>
		</Border>
	);
};
export default CoolBox;

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
