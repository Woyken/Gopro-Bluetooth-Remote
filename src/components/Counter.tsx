import {createSignal} from 'solid-js';
import './Counter.css';
import {Button} from './lowLevel';

export default function Counter() {
	const [count, setCount] = createSignal(0);
	return (
		<button class="increment" onClick={() => setCount(count() + 1)}>
			Clicks: {count()}
			<Button color="danger" isRounded>
				test1
			</Button>
		</button>
	);
}
