import "../assets/styles/contentStyles.css";

const Content = ({ children, isErrorPage = false }) => {
  return (
    <main className="app-main" style={{ backgroundColor: isErrorPage ? 'black' : '#181a1f' }}>
      {children}
    </main>
  );
};

export default Content;
