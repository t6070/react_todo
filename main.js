const getKey = () => Math.random().toString(32).substring(2);

function Todo() {
	const [items, setItems] = React.useState([
		{key: getKey(), text: "lean JavaScript", done: false},
		{key: getKey(), text: "lean PHP", done: true},
		{key: getKey(), text: "lean HTML", done: false}
	]);

	return (
		<div classname="panel">
			<div classname="panel-heading">
				ToDo List
			</div>
			{items.map(item => (
				<label className="panel-block">
				<input type="checkbox" />
					{item.text}
				</label>
			))}
			<div classname="oanel-block">
				{items.length} items
			</div>
		</div>
	)
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