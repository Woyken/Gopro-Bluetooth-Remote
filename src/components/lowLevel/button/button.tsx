import {Button as RawButton} from '@kobalte/core';
import {clsx} from 'clsx';
import {type ParentProps, splitProps} from 'solid-js';
import './button.sass';

type Style = 'secondary' | 'contrast';

type Props = Parameters<typeof RawButton.Root>['0'] & {
	/** Buttons come with .secondary and .contrast styles. */
	color?: Style;
	/** And a classic .outline variant. */
	outline?: boolean;
	/** Enable a loading indicator. */
	isLoading?: boolean;
	tooltip?: string;
	tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left';
};

function Button(props: ParentProps<Props>) {
	const [childrenProps, propsWithoutChildren] = splitProps(props, ['children']);
	const [local, others] = splitProps(propsWithoutChildren, [
		'color',
		'outline',
		'isLoading',
		'tooltip',
		'tooltipPlacement',
	]);
	return (
		<RawButton.Root
			{...others}
			aria-busy={local.isLoading}
			data-tooltip={local.tooltip}
			data-placement={local.tooltipPlacement}
			class={clsx(
				'button',
				local.color && `${local.color}`,
				local.outline && 'outline',
			)}
		>
			{childrenProps.children}
		</RawButton.Root>
	);
}

export default Button;
