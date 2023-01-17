import Button from 'react-bootstrap/Button';
import homePageVideo from '~/assets/video/home-page-video.mp4';

function Home() {
  return (
    <div style={{ height: '2000px' }} className="homepage-container">
      <div className="homepage-background">
        <video className="homepage-video" autoPlay loop muted>
          <source src={homePageVideo} type="video/mp4" />
        </video>
      </div>
      <div className="homepage-content">
        <h1 className="title">There's a better way to ask</h1>
        <div className="desc">
          You don't want to make a boring form. And your audience won't answer one. Create a typeform instead—and make
          everyone happy.
        </div>
        <Button  variant="primary" size="lg">Get started - it's free</Button>
        <div className='condition'>
          <p>
            No credit card required
          </p>
          <p>
            No time limit on Free plan
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
