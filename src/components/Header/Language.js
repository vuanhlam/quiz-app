import i18next from "i18next";
import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Language(props) {

    const { t, i18n } = useTranslation();

    const hanldeChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }

    return (
        <>
            <NavDropdown title={i18n.language === 'vi' ? 'Tiếng Việt' : 'English'} id="basic-nav-dropdown" className="languages" > 
                <NavDropdown.Item
                    onClick={() => hanldeChangeLanguage('en')}
                >
                    English
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                    onClick={() => hanldeChangeLanguage('vi')}
                >
                    Việt Nam
                </NavDropdown.Item>
            </NavDropdown>
        </>
    );
}

export default Language; 
