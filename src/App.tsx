import "./styles/global.scss";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './configRouter/index';
import 'antd/dist/antd.less'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

function App(): JSX.Element {
  return (
    <BrowserRouter>
        <div className="App">
        <AppRouter />
        </div>
    </BrowserRouter>

  );
}

export default App;
