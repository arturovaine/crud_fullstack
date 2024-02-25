import Categories from '../components/Categories';

const MainContent = () => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>Authorized Access!</div>
      <Categories/>
    </div>
  );
};

export default MainContent;
