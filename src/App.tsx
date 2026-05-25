import { lazy, Suspense } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character/Scene"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const Fallback = () => <div style={{ minHeight: "100vh" }} aria-hidden="true" />;

const App = () => {
  return (
    <LoadingProvider>
      <Suspense fallback={<Fallback />}>
        <MainContainer>
          <Suspense fallback={null}>
            <CharacterModel />
          </Suspense>
        </MainContainer>
      </Suspense>
    </LoadingProvider>
  );
};

export default App;
