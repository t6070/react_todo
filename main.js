function Todo() {
	return null;
  }
  
  function App() {
	return (
	  <div className="container is-fluid">
		<Todo />
	  </div>
	);
  }
  
  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);