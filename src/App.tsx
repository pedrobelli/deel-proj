import "./App.css";

import Typeahead from "./components/Typeahead/Typeahead";

function App() {
  return (
    <div className="App">
      <Typeahead
        options={[
          "Lord of the Rings",
          "Star Wars",
          "Everything Everywhere All at Once",
          "Spider Man No Way Home",
        ]}
      />
    </div>
  );
}

export default App;
