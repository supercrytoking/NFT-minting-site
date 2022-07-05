import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";

import Header from '../components/header';
import Footer from '../components/footer';
import siteConfig from "../config/site.config";
import { connect } from "../api/wallet";
import { mint, owner } from "../api/nft"
import { getShortAddress } from '../service/string'
import { getWei } from '../service/common'

const Home = () => {
  const [amount, setAmount] = useState(1);
  const [isMint, setIsMint] = useState(false)
  const [address, setAddress] = useState('')

  const handleIncrease = () => {
    setAmount(Math.min(10, amount + 1))
  }
  const handleDecrease = () => {
    setAmount(Math.max(1, amount - 1))
  }
  const handleConnect = () => {
    connect()
      .then((res) => {
        setAddress(res.account)
        setIsMint(true)
      })
      .catch((error) => {
        NotificationManager.warning('Warning', error.message, 3000);
      })
  }
  const handleMint = () => {
    owner()
      .then((owner) => {
        let value = 0
        if (owner !== address)
          value = getWei(amount * siteConfig.DISPLAY_COST)
        mint(amount, address, value)
          .then((res) => {
            NotificationManager.success('Success', "Success minted", 3000);
          })
          .catch((error) => {
            NotificationManager.warning('Warning', error?.message, 3000);
          })
      })
  }

  useEffect(() => {
    handleConnect()
  }, [])
  return (
    <>
      <Header address={address} connect={handleConnect} />
      <section className="main-section" id="index">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-12 order-xs-2">
              <div className="title">
                <h1>Elastic Waves</h1>
              </div>
              <div className="main-box">
              </div>
              {!isMint ? (
                <div className="flex-center">
                  <div className="main-counter">
                    <div className="title">
                      <h2>Mint</h2>
                    </div>
                    <p>Price of one Elastic Waves NFT: {(siteConfig.DISPLAY_COST * amount).toFixed(1)} ETH.</p>
                    <div className="counter">
                      <button onClick={() => handleDecrease()}>-</button>
                      <span>{amount}</span>
                      <button onClick={() => handleIncrease()}>+</button>
                    </div>
                    <ul className="navbar-nav mr-auto">
                      <a className="custom-btn" id="connect-wallet" onClick={handleMint}>
                        Mint
                      </a>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="main-button" id="navbarText">
                  <ul className="navbar-nav mr-auto">
                    <a className="custom-btn" id="connect-wallet" onClick={handleConnect}>
                      {address === '' ? "Connect Wallet" : getShortAddress(address)}
                    </a>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="image-slider">
          <div>
            <img src="/images/1.png" alt="" style={{ borderRadius: '10%' }} />
            <img src="/images/2.png" alt="" style={{ borderRadius: '10%' }} />
            <img src="/images/3.png" alt="" style={{ borderRadius: '10%' }} />
            <img src="/images/4.png" alt="" style={{ borderRadius: '10%' }} />
            <img src="/images/5.png" alt="" style={{ borderRadius: '10%' }} />
            <img src="/images/6.png" alt="" style={{ borderRadius: '10%' }} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Home;