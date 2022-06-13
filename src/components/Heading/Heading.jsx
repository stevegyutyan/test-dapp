import React, { useState } from 'react'
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { Switch } from 'antd';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { useThemeSwitcher } from "react-css-theme-switcher";
import Chains from 'components/Heading/Chains/Chains';
import TokenPrice from 'components/Heading/TokenPrice';
import NativeBalance from 'components/Heading/NativeBalance';
import Account from 'components/Heading/Account/Account';
import logo from '../../assets/logo.png'
import './Heading.scss'

const Heading = () => {
    const [current, setCurrent] = useState('staking');
    const onClick = e => {
        setCurrent(e.key);
    };

    const [isDarkMode, setIsDarktMode] = useState(true);
    const { switcher, themes } = useThemeSwitcher();
    const switchTheme = (isDarkMode) => {
        setIsDarktMode(isDarkMode);
        switcher({ theme: isDarkMode ? themes.dark : themes.light });
    };

    return (
        <Menu className="header">
            <img src={logo} alt="Logo" className='header__logo' />
            <Menu
                onClick={onClick}
                mode="horizontal"
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "-6px",
                    fontSize: "16px",
                    fontWeight: "500",
                    border: "none",
                    width: "100%",
                    background: "none"

                }}
                selectedKeys={[current]}
            >
                <Menu.Item key="staking">
                    <NavLink to="/staking">Staking</NavLink>
                </Menu.Item>
                <Menu.Item key="marketplace">
                    <NavLink to="/marketplace">Marketplace</NavLink>
                </Menu.Item>
                <Menu.Item key="charts">
                    <NavLink to="/charts">Charts</NavLink>
                </Menu.Item>
                <Menu.Item key="exchange">
                    <NavLink to="/exchange">Exchange</NavLink>
                </Menu.Item>
                <Menu.Item key="buy-crypto">
                    <NavLink to="/buy-crypto">Buy Crypto</NavLink>
                </Menu.Item>

                <Menu.Item key="portfolio">
                    <NavLink to="/portfolio">Portfolio</NavLink>
                </Menu.Item>

                <Menu.Item key="reit">
                    <NavLink to="/reit">REIT</NavLink>
                </Menu.Item>
                <Menu.Item key="bots">
                    <NavLink to="/bots">Bots</NavLink>
                </Menu.Item>
            </Menu>

            <Menu className='header__right'>
                <Switch
                    checkedChildren={<BsFillMoonStarsFill />}
                    unCheckedChildren={<BsFillSunFill />}
                    checked={isDarkMode}
                    onChange={switchTheme}
                />
                <Chains />
                <TokenPrice
                    address="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
                    chain="eth"
                    image="https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/"
                    size="40px"
                />
                <NativeBalance />
                <Account />
            </Menu>
        </Menu>
    );
}

export default Heading;
