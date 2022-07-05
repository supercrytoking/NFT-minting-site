const Footer = () => {
  return (
    <section className="main-section" id="index">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-12 order-xs-2">
            <div className="title">
              <h1>JOIN OUR COMMUNITY</h1>
            </div>
            <div className="main-box">
              <div className="social-btn">
                <ul>
                  <li>
                    <img src="images/instagram.svg" alt="" />
                  </li>
                  <li>
                    <img src="images/discord.svg" alt="" />
                  </li>
                  <li>
                    <img src="images/twitter.svg" alt="" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="main-box">
              <p>More updates are coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer;