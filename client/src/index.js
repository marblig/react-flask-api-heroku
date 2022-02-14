import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import HomePage from './components/Home'
import FilmsPage from './components/Films'
import SeriesPage from './components/Series'
import CreateFilmPage from './components/CreateFilm'
import CreateSeriesPage from './components/CreateSeries'

import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'



const App = () => {

    
    return (
        <Router>
            <div className="container">
                <Navbar/>
                <Routes>
                    <Route path="/add_series" element={<CreateSeriesPage/>} />
                    <Route path="/add_film" element={<CreateFilmPage/>} />
                    <Route path="/series" element={<SeriesPage/>} />
                    <Route path="/films" element={<FilmsPage/>} />
                    <Route path="/" element={<HomePage/>} />
                </Routes>
            </div>
        </Router>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))