import { AuthContextProvider } from "./context/auth-context";
import Router from "./router/Router";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </div>
  );
}

export default App;
