import './App.css';
import Admin from './Pages/Admin';
import Home from './Pages/Home';
import User from './Pages/User';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/user/*' element={<User />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
