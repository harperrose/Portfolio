import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { getProjectBySlug, getSiteContent } from './lib/content';
import HomePage from './pages/HomePage';
import InfoPage from './pages/InfoPage';
import CaseStudyPage from './pages/CaseStudyPage';

const content = getSiteContent();

function CaseStudyRoute() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return <CaseStudyPage project={project} allProjects={content.projects} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage projects={content.projects} site={content.site} />}
        />
        <Route
          path="/info"
          element={
            <InfoPage
              projects={content.projects}
              services={content.services}
              site={content.site}
            />
          }
        />
        <Route path="/:slug" element={<CaseStudyRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
