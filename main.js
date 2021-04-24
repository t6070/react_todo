// 各タスクごとに一意のidを付与し、識別できるようにする
const getKey = () => Math.random().toString(32).substring(2);

// 各タスク毎にstateとpropsを定義し、情報を保有しておく
function Todo() {
	const [items, setItems] = React.useState([
		{key: getKey(), text: "lean JavaScript", done: false},
		{key: getKey(), text: "lean PHP", done: true},
		{key: getKey(), text: "lean HTML", done: false}
	]);
// タスクは複数個存在しているため、ループによって反映させる
	return (
		<div classname="panel">
			<div classname="panel-heading">
				ToDo List
			</div>
			{items.map(item => (
				<TodoItem key={item.key} item={item}/>
			))}
			<div classname="oanel-block">
				{items.length} items
			</div>
		</div>
	);
}
  
// 中身の各タスクは別途でループ呼び出し
function App() {
	return (
		<div className="container is-fluid">
			<Todo />
		</div>
	);
}

// タスク内容を入力後、タスクを実際に生成する
function TodoItem() {
	return (
		<label className="panel-block">
			<input type="checkbox"/>
			{item.text}
		</label>
	)
}
  
// ルートドキュメントへの反映
const root = document.getElementById('root');
ReactDOM.render(<App />, root);