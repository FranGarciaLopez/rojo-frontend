import NavBar from '../molecules/NavBar';
import NotFoundSection from '../molecules/NotFoundSection'

const NotFound = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />
      <NotFoundSection />
    </div>
  );
};

export default NotFound;