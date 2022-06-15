import App from "./App";
import { MoralisProvider } from "react-moralis";
// import BrowserRouter from "components/BrowserRouter/BrowserRouter";
// import Staking from "pages/Staking/Staking";

export const Dapp = () => {
    const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
    const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
    const isServerInfo = APP_ID && SERVER_URL ? true : false;

    //Validate
    if (!APP_ID || !SERVER_URL)
        throw new Error(
            "Missing Moralis Application ID or Server URL. Make sure to set your .env file."
        );
    if (isServerInfo)
        return (
            <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
                {/* <BrowserRouter> */}
                    <App isServerInfo />
                {/* </BrowserRouter> */}
            </MoralisProvider>
        );
    // else {
    //     return (
    //         <div style={{ display: "flex", justifyContent: "center" }}>
    //             <Staking />
    //         </div>
    //     );
    // }
};