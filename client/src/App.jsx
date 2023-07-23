import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from './components/Home';
import Play from './components/playComponents/Play';

function App() {
  return (
    <BrowserRouter Router >
      <div className="App" >
        <Routes>
          <Route path="/" element={<Navigate to="/puzzles" />}/>
          <Route path="/puzzles/*" element={<Home />} />
          <Route path="/play/:id" element={<Play />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;