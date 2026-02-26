import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitComplaint from './pages/SubmitComplaint';
import MyComplaints from './pages/MyComplaints';
import AssignedComplaints from './pages/AssignedComplaints';
import AllComplaints from './pages/AllComplaints';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submit"
          element={
            <ProtectedRoute roles={['student']}>
              <SubmitComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute roles={['student']}>
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assigned"
          element={
            <ProtectedRoute roles={['staff']}>
              <AssignedComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/all-complaints"
          element={
            <ProtectedRoute roles={['admin']}>
              <AllComplaints />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
