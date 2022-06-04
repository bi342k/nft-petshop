import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Header from './Components/Header';
import Body from './Components/Body';
function App() {
  return (

    <div className="App">
      <Provider store={store}>
        <Header />
        <Body />
      </Provider>

    </div>

  );
}

export default App;
