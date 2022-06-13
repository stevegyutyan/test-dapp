import React from 'react'
import { NavLink } from 'react-router-dom'
import { ETHLogo, BSCLogo, AvaxLogo, PolygonLogo } from './Icons'
import './Sidebar.scss'

const Sidebar = () => {
    return (
        <aside className='sidebar'>
            <ul className='sidebar__list'>
                <li><NavLink className="sidebar__link" to="/etherium"><ETHLogo />Etherium</NavLink></li>
                <li><NavLink className="sidebar__link" to="/bsc"><BSCLogo />BSC</NavLink></li>
                <li><NavLink className="sidebar__link" to="/polygon"><PolygonLogo />Polygon</NavLink></li>
                <li><NavLink className="sidebar__link" to="/avalanche"><AvaxLogo />Avalanche</NavLink></li>
            </ul>
        </aside>
    )
}
//https://medium.com/@chowjiaying211/creating-a-responsive-sidebar-in-ant-design-e26c7423789f
export default Sidebar