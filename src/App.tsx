import "./App.css";
import Trains from "../src/components/Trains/Trains";
import { TrainProvider } from "./context/TrainContext";

function App() {
  return (
    <TrainProvider>
      <Trains />
    </TrainProvider>
  );
}

export default App;
