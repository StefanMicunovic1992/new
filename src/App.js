import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import Registar from './components/Registar/Registar';
import SelectedPodcast from './components/SelectedPodcast/SelectedPodcast';
import YourAccount from './components/YourAccount/YourAccount';
import Administrator from './components/Administrator/Administrator';
import PlayVideo from './components/PlayVideo/PlayVideo';
import Contact from './components/Contact/Contact';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Login></Login>}></Route>
                <Route path={'/register'} element={<Registar></Registar>}></Route>
                <Route path={'/home_page'} element={<HomePage></HomePage>}></Route>
                <Route path={'/selected_podcast'} element={<SelectedPodcast></SelectedPodcast>}></Route>
                <Route path={'/your_account'} element={<YourAccount></YourAccount>}></Route>
                <Route path={'/administrator'} element={<Administrator></Administrator>}></Route>
                <Route path={'/video'} element={<PlayVideo></PlayVideo>}></Route>
                <Route path={'/contact'} element={<Contact></Contact>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;