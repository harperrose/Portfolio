import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { getListedProjects, getProjectBySlug, getSiteContent } from './lib/content';
import HomePage from './pages/HomePage';
import InfoPage from './pages/InfoPage';
import CaseStudyPage from './pages/CaseStudyPage';

const content = getSiteContent();
const listedProjects = getListedProjects();

function CaseStudyRoute() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project || project.draft) {
    return <Navigate to="/" replace />;
  }

  return <CaseStudyPage project={project} site={content.site} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage projects={listedProjects} site={content.site} />} />
        <Route
          path="/info"
          element={
            <InfoPage
              projects={listedProjects}
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
