import React from 'react';
import { Checklist } from './features/checklist/Checklist';
import daily from './data/daily.json';

function App() {
  return (
    <div className="App">
        < Checklist checklist={daily}/>
    </div>
  );
}

export default App;
