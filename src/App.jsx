import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './lib/ThemeContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ChatWidget from './components/ChatWidget.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Courses from './pages/Courses.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import Faculty from './pages/Faculty.jsx'
import SuccessStories from './pages/SuccessStories.jsx'
import Blog from './pages/Blog.jsx'
import Events from './pages/Events.jsx'
import Careers from './pages/Careers.jsx'
import Contact from './pages/Contact.jsx'
import Products from './pages/Products.jsx'
import Services from './pages/Services.jsx'
import StudentPortal from './pages/StudentPortal.jsx'
import NotFound from './pages/NotFound.jsx'
import Australia from './pages/Australia'
import { CurrencyProvider } from './lib/CurrencyContext.jsx'
import { AuthProvider } from './lib/AuthContext.jsx'
import Dashboard from './pages/Dashboard.jsx'
import EducationalSolutions from './pages/EducationalSolutions.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <AuthProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:slug" element={<CourseDetail />} />
                <Route path="/faculty" element={<Faculty />} />
                <Route path="/success-stories" element={<SuccessStories />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/events" element={<Events />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Products />} />
                <Route path="/services" element={<Services />} />
                <Route path="/solutions/educational-institutes" element={<EducationalSolutions />} />
                <Route path="/student-portal" element={<StudentPortal />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/australia" element={<Australia />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ChatWidget />
          </div>
        </AuthProvider>
      </CurrencyProvider>
    </ThemeProvider>
  )
}