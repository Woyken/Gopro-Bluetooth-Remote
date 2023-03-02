import {Button as RawButton} from '@kobalte/core';
import {clsx} from 'clsx';
import {type ParentProps, splitProps} from 'solid-js';
import './button.sass';

type Style = 'secondary' | 'contrast';

type Props = Parameters<typeof RawButton.Root>['0'] & {
	/** Buttons come with .secondary and .contrast styles. */
	buttonStyle?: Style;
	/** And a classic .outline variant. */
	outline?: boolean;
	/** Enable a loading indicator. */
	isLoading?: boolean;
};

function Button(props: ParentProps<Props>) {
	const [childrenProps, propsWithoutChildren] = splitProps(props, ['children']);
	const [local, others] = splitProps(propsWithoutChildren, [
		'buttonStyle',
		'outline',
		'isLoading',
	]);
	return (
		<RawButton.Root
			{...others}
			aria-busy={local.isLoading}
			class={clsx(
				'button',
				local.buttonStyle && `${local.buttonStyle}`,
				local.outline && 'outline',
			)}
		>
			{childrenProps.children}
		</RawButton.Root>
	);
}

// Function ButtonGroup() 'buttons are-large'

export default Button;
