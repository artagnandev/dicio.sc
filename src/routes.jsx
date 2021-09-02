import {
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/home/';
import Show from './pages/show/';
import Meanings from './pages/meanings/';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/screen" element={<Show />} />
      <Route path="/meanings" element={<Meanings />} />
    </Routes>
  )
}

export default AppRoutes;