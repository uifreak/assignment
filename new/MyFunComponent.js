'use strict';
import '../old/MyFunComponent.css';

function MyFunComponent () {
  const [displayText, setDisplayText] = React.useState('');
  const [buttonClicked, setButtonClicked] = React.useState(null);

  const oldCompEventHandler = React.useCallback((text) => {
    setDisplayText(text);
  }, [setDisplayText]);

  React.useEffect(() => {
    document.addEvent('ButtonClicked', oldCompEventHandler);

    return () => {
      document.removeEvent('ButtonClicked', oldCompEventHandler);
    }
  }, []);

  React.useEffect(() => {
    if (!buttonClicked) return;

    document.fireEvent('NewButtonClicked', buttonClicked);
  }, [buttonClicked])

  return (<div className="MyFunComponent--container">
    <p>New React Component</p>
    <p>Old Component Button Clicked: {displayText || 'None'}</p>
    <button onClick={(event) => setButtonClicked('New Button One')}>One</button>
    <button onClick={(event) => setButtonClicked('New Button Two')}>Two</button>
  </div>)
}

const domContainer = document.querySelector('#new');
const root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(MyFunComponent));
