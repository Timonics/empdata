import { RouterProvider } from "react-router";
import { setStore } from "./utils/axios";
import { store } from "./store/store";
import { router } from "./router";

function App() {
  setStore(store);

  return <RouterProvider router={router} />;
}

export default App;
