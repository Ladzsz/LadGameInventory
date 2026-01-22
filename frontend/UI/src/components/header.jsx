import '../assets/styles/headerStyles.css';
import gamelogo from '../assets/images/Gamelogo.png';

function Header() {
  return (
    <header>
        <div id="heading-container">
            <h1 id="header-title">Lad Game Inventory</h1>

            <p id="header-text">A neat little game inventory app made by Lad</p>
        </div>
        

        <nav id="header-navbar">
            <a href="/">Home</a> 
            <a href="/games">Games</a> 
        </nav>

        <img src={gamelogo} alt="Logo"/>
    </header>
  );
};

export default Header;