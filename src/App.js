import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import MastHead from "./components/decorator/MastHead";
import MastFooter from "./components/decorator/MastFooter";

function App() {
  return (
    <div id="app" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <MastHead />
      <main style={{
        flex: 1,
        minHeight: 'calc(100vh - 149px - 4rem)',
        padding: '2rem'
      }}>
        <BrowserRouter basename="/">
          <Routes />
        </BrowserRouter>
      </main>
      <MastFooter />
    </div>
  )
}

export default App;
