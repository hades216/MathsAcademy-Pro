import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SchoolLogin from './pages/SchoolLogin';
import StudentLogin from './pages/StudentLogin';
import TeacherLogin from './pages/TeacherLogin';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Library from './pages/Library';
import LessonPlayer from './pages/LessonPlayer';
import HomeworkPlayer from './pages/HomeworkPlayer';
import ExamPlayer from './pages/ExamPlayer';
import Pricing from './pages/Pricing';
import GetStarted from './pages/GetStarted';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingBackground from './components/layout/FloatingBackground';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-brand-bg text-white relative overflow-hidden font-sans">
        <FloatingBackground />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login/school" element={<SchoolLogin />} />
              <Route path="/login/student" element={<StudentLogin />} />
              <Route path="/login/teacher" element={<TeacherLogin />} />
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/teacher/*" element={<TeacherDashboard />} />
              <Route path="/library" element={<Library />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/lesson/:id" element={<LessonPlayer />} />
              <Route path="/homework/:id" element={<HomeworkPlayer />} />
              <Route path="/exam/:id" element={<ExamPlayer />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
