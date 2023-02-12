import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";

import homePageVideo from '~/assets/video/home-page-video.mp4';

function Home() {
    const isAuthenticated = useSelector((state) => state.userAccount.isAuthenticated);
    const navigate = useNavigate();
    const {t, i18n} = useTranslation ();

    return (
        <div style={{ height: '2000px' }} className="homepage-container">
            <div className="homepage-background">
                <video className="homepage-video" autoPlay loop muted>
                    <source src={homePageVideo} type="video/mp4" />
                </video>
            </div>
            <div className="homepage-content">
                <h1 className="title">
                    {t("home.title1")}
                </h1>
                <div className="desc">
                    {t('home.title2')}
                </div>
                {isAuthenticated ? (
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={() => navigate('/users')}
                    >
                        Do Quiz Now
                    </Button>
                ) : (
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={() => navigate('/login')}
                    >
                        {t('home.title3.login')}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Home;
