// ループのためのキーを生成(本来はDB側でキーを生成するが、今回はここで生成)
const getKey = () => Math.random().toString(32).substring(2);

// Todo部分をレンダリングする関数
function Todo() {
	// stateの定義(タスクは複数個になるため、初期値を空のオブジェクトにする)
	const [items, setItems] = React.useState([
		// {key: getKey(), text: "lean JavaScript", done: false},
		// {key: getKey(), text: "lean PHP", done: false},
		// {key: getKey(), text: "lean HTML", done: false}
	]);

	// ループで回したうちのタスクと、チェックを入れたタスクのキーが一致した場合、doneを反転させる
	// コールバックなので、newItemsにはdoneが正しく更新されたデータが入る
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

	// inout要素に入力した内容をstateへ追加できるようにする関数
	// input要素を生成する際にこの関数を呼び出しておく
	const handleAdd = text => {
		setItems([...items, {key:getKey(), text, done:false}]);
	};

	return (
		<div className="panel">
			<div className="panel-heading">
				ToDo List
			</div>
			<Input onAdd={handleAdd}/>
			{items.map(item => (
				<TodoItem
					key={item.key}
					item={item}
					onCheck={handleCheck}
				/>
			))}
			<div className="panel-block">
				{items.length} items
			</div>
		</div>
	);
  }

  // input要素に関する処理
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
			placeholder="Enter to Add"
			value={text}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
		/>
		</div>
	)
  }

  // Todoコンポーネント内の各タスクを生成する
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


  // ルートコンポーネント
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