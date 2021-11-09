import "./App.css";
import { Suspense } from "react";

import Scene from "./components/Scene";

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}

export default App;
