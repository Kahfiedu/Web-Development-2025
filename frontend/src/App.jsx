import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/Index";

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
