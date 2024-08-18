// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentPage from './pages/DocumentPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';

function App() {
  return (
    
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/documents" element={<DocumentPage />} />
        
        {/* <Route path="/upload" element={<UploadPage />} /> */}
        <Route path="/logout" element={<LogoutPage />} />
        {/* Add other routes here */}
      </Routes>
    
  );
}

export default App;
