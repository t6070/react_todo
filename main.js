// ループのためのキーを生成(本来はDB側でキーを生成するが、今回はここで生成)
const getKey = () => Math.random().toString(32).substring(2);


/*
* ルートコンポーネント
*/
function Todo() {
	// stateの定義(タスクは複数個になるため、初期値を空のオブジェクトにする)
	const [items, setItems] = React.useState([]);
	// All・Todo・Doneを管理するためのフィルタリングをstateとして保持
	const [filter, setFilter] = React.useState("ALL");

	// inout要素に入力した内容をstateへ追加可能とする
	const handleAdd = text => {
		setItems([...items, {key:getKey(), text, done:false}]);
	};

	// フィルター条件として何を選んでいるかをstateに追加する
	const handleFilterChange = value => setFilter(value);

	// itemsから、現在選択しているフィルター条件に一致する物だけを返す
	const displayItems = items.filter(item => {
		if (filter === "ALL") return true;
		if (filter === "TODO") return !item.done;
		if (filter === "DONE") return item.done;
	})

	// 選択されたタスクのステータスを変更し、そのitemを返す
	const handleCheck = checked => {
		const newItems = items.map(item => {
			if(item.key === checked.key){
				item.done = !item.done;
			}
			return item;
		})
		// useStateのsetItemsにより、doneを更新したデータをstateに保存する
		setItems(newItems);
	}

	return (
		<div className="panel">
			<div className="panel-heading">
				What you should do today？
			</div>
			<Input onAdd={handleAdd}/>
			<Filter 
				onChange={handleFilterChange}
				value={filter}
			/>
			{displayItems.map(item => (
				<TodoItem
					key={item.text}
					item={item}
					onCheck={handleCheck}
				/>
			))}
			<Announcement
				itemLength={displayItems.length}
			/>
		</div>
	);
  }


  /*
   * 残タスク数を表示する
   */
  function Announcement({itemLength}) {
	let announceText = "finished!"
	if (itemLength > 0) {
		announceText = `There are ${itemLength} more things you need to do！`;
	}else{
		announceText = "finished!";
	}
	return (
		<div className="panel-block">
			{announceText}
		</div>
	)
  }


  /*
   * フィルタリングのタブ部分
   */
  function Filter({value, onChange}) {
	const handleClick = (key, e) => {
		e.preventDefault();
		onChange(key);
	}
	return (
		<div className = "panel-tabs">
			<a
				href = "#"
				onClick = {handleClick.bind(null, "ALL")}
				className = {classNames({"is-active" : value === "ALL"})}
			>ALL</a>
			<a
				href = "#"
				onClick = {handleClick.bind(null, "TODO")}
				className = {classNames({"is-active" : value === "TODO"})}
			>TODO</a>
			<a
				href = "#"
				onClick = {handleClick.bind(null, "DONE")}
				className = {classNames({"is-active" : value === "DONE"})}
			>DONE</a>
		</div>
	)
  }


  /*
   * タスク入力のinput要素
   */
  function Input({onAdd}) {
	  const [text, setText] = React.useState('');
	  // onChange(文字が入力される)が走る度に、stateにinputの入力値を保存しておく
	  const handleChange = e => setText(e.target.value);
	  // エンターが押下されたら、Todoコンポーネントのstateに値を追加する
	  const handleKeyDown = e =>{
		if(e.key === "Enter"){
			// onAddは、関数コンポーネントとして呼び出されているInput部分でhandleAddとされている
			onAdd(text);
			// Input函数内でのstateはあくまで一時的な物であるため、Enter押下後に空文字を登録して削除
			setText('');
		}
	}
	// stateとして保存してあるtextを反映したタスク要素を返す
	// この時、次に追加したいタスクのために、input要素に対して各種必要なイベント等を追加しておく
	return(
		<div className="panel-block">
			<input
			class="input"
			type="text"
			placeholder="What should you do?"
			value={text}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
		/>
		</div>
	)
  }


  /*
   * タスク1つ分の要素
   */
  function TodoItem({item, onCheck}) {

	const handleChange = () => {
		onCheck(item);
	}

	return (
		<label className="panel-block">
			<input 
				type="checkbox" 
				checked={item.done}
				onChange={handleChange}
			/>
			<span
				className={classNames({
					'has-text-grey-light':item.done
				})}
			>
			{item.text}
			</span>
		</label>
	);
  }


  // アプリ全体
  function App() {
	return (
	  <div className="container is-fluid">
		<Todo />
	  </div>
	);
  }
  
   // ルートコンポーネントを取得し、反映させる
  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);