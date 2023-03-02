import {ContextMenu, Popover} from '@kobalte/core';
import {createSignal} from 'solid-js';
import {Button} from './lowLevel';
import {mdiArrowDownThick} from '@mdi/js';

export default function SplitButton() {
	const [ref, setRef] = createSignal<HTMLButtonElement>();
	const [open, setOpen] = createSignal(false);

	return (
		<div>
			<Popover.Root anchorRef={ref} isOpen={open()} onOpenChange={setOpen}>
				{/* <Button ref={setRef} onclick={() => setOpen((o) => !o)}>
					Abc
				</Button> */}
				<Popover.Trigger>
					<svg width="1em" height="1em" viewBox="0 0 24 24">
						<path d={mdiArrowDownThick}/>
					</svg>
					{open() ? 'Close' : 'Open'}
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Content>
						<div>
							<Popover.Title>About Kobalte</Popover.Title>
							<Popover.CloseButton>Icon here?</Popover.CloseButton>
						</div>
						<Popover.Description>
							A UI toolkit for building accessible web apps and design systems
							with SolidJS.
						</Popover.Description>
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
			{/* <Popover.Root isOpen={false} anchorRef={ref}>
				<div>abc</div>
				<div>abc</div>
				<div>abc</div>
				<div>abc</div>
			</Popover.Root> */}
		</div>
	);
}
