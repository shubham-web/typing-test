import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DataProvider } from "../data";

function TypingTest({ Component, pageProps }: AppProps) {
	return (
		<DataProvider>
			<Component {...pageProps} />
		</DataProvider>
	);
}

export default TypingTest;
