import React from 'react'
import PortfolioChart from './PortfolioChart/PortfolioChart'
import ERC20Balance from './ERC20Balance/ERC20Balance'
import ERC20Transfers from './ERC20Transfers/ERC20Transfers'
import NFTBalance from './NFTBalance/NFTBalance'
import './Portfolio.scss'


const Portfolio = () => {
    return (
        <main className='portfolio'>
            <div className='portfolio__slice'>
                <ERC20Balance />
                <PortfolioChart />
            </div>
            <div className='portfolio__slice'>
                <PortfolioChart />
                <ERC20Transfers />
            </div>
            <div className='portfolio__slice'>
                <NFTBalance />
                <PortfolioChart />
            </div>
        </main>
    )
}

export default Portfolio