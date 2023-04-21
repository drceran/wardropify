import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function loadHatDetails() {
  const response = await fetch('http://localhost:8090/api/hatdetails/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App hatdetails={data.hatdetails} />
      </React.StrictMode>
    );
  } else {
    console.error(response);
  }
}
loadHatDetails();
