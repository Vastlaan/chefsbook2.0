import GlobalStyles from "../globals/globalStyles";
import ThemeProvider from "../globals/themeProvider";
import StateProvider from "../globals/stateProvider";

export default function App({ Component, pageProps }) {
    return (
        <>
            <StateProvider>
                <ThemeProvider>
                    <GlobalStyles />
                    <Component {...pageProps} />
                </ThemeProvider>
            </StateProvider>
        </>
    );
}
