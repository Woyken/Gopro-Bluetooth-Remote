import {createSignal} from 'solid-js';
import {Button} from './lowLevel';
import SplitButton from './splitButton2';

export default function Counter() {
	const [count, setCount] = createSignal(0);
	return (
		<>
			<button class="increment" onClick={() => setCount(count() + 1)}>
				Clicks: {count()}
			</button>
			<Button color="contrast">test1</Button>
			<SplitButton></SplitButton>
		</>
	);
}
