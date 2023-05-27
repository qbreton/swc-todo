import React from 'react';
import { Checklist } from './features/checklist/Checklist';
import daily from './data/daily.json';
import weekly from './data/weekly.json';
import monthly from './data/monthly.json';
import others from './data/others.json';

function App() {
  return (
    <div className="app">
      <Checklist checklist={daily}/>
      <Checklist checklist={weekly}/>
      <Checklist checklist={monthly}/>
      <Checklist checklist={others}/>
    </div>
  );
}

export default App;
