import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import { Link } from 'react-router-dom';

function App() {
    return (
        <div className="app-container">
            <Header/>
            <div>
                Test Link
                <div>
                    <button>
                        <Link to="/users">Go to user page</Link>
                    </button>
                    <button>
                        <Link to="/admins">Go to admin page</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
