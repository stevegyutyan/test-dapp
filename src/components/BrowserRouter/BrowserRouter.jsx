import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import Heading from "components/Heading/Heading";
import Staking from 'pages/Staking/Staking';
import Charts from "pages/Charts/Charts";
import ChartsPages from "pages/Charts/ChartsPages/ChartsPages";
import Exchange from "pages/Exchange/Exchange";
import BuyCrypto from "pages/BuyCrypto/BuyCrypto";
import Reit from "pages/REIT/Reit";
import Bots from "pages/Bots/Bots";
import Portfolio from "pages/Portfolio/Portfolio";
import Footing from 'components/Footing'
import { ETHLogo, BSCLogo, PolygonLogo } from './Icons'
import { Layout, Tabs } from "antd";
import MarketPlace from "pages/MarketPlace/MarketPlace";

const { Header, Footer } = Layout

const BrowserRouter = ({ isServerInfo }) => {
    return (
        <Layout>
            <Router>
                <Header>
                    <Heading />
                </Header>

                <Switch>
                    <Route exact path="/staking">
                        <Staking isServerInfo={isServerInfo} />
                    </Route>
                    <Route path="/marketplace">
                        <MarketPlace />
                    </Route>
                    <Route path="/charts">
                        <Charts />
                    </Route>
                    <Route path="/charts/:id">
                        <ChartsPages />
                    </Route>
                    <Route path="/exchange">
                        <Tabs defaultActiveKey="1" style={{ alignItems: "center", paddingTop: "70px" }}>
                            <Tabs.TabPane tab={<ETHLogo />} key="1">
                                <Exchange chain="eth" />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={<BSCLogo />} key="2">
                                <Exchange chain="bsc" />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={<PolygonLogo />} key="3">
                                <Exchange chain="polygon" />
                            </Tabs.TabPane>
                        </Tabs>
                    </Route>
                    <Route path="/buy-crypto">
                        <BuyCrypto />
                    </Route>

                    <Route path="/portfolio">
                        <Portfolio />
                    </Route>

                    <Route path="/reit">
                        <Reit />
                    </Route>
                    <Route path="/bots">
                        <Bots />
                    </Route>
                    <Route path="/">
                        <Redirect to="/staking" />
                    </Route>
                    <Route path="/ethereum-boilerplate">
                        <Redirect to="/staking" />
                    </Route>
                    <Route path="/nonauthenticated">
                        <>Please login using the "Authenticate" button</>
                    </Route>
                </Switch>
                <Footing />
            </Router>
        </Layout >
    )
}

export default BrowserRouter