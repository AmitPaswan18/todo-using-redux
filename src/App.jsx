import TodoItems from "./components/TodoItems";
import store from "./redux/store/configureStore.js";

import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <TodoItems />
      </Provider>
    </>
  );
}

export default App;
