import NavBar from './componemt/NavBar';
import Todos from './pages/Todos';
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
    <NavBar></NavBar>
    <Toaster/>
    <Todos></Todos>
    </>
  );
}

export default App;
