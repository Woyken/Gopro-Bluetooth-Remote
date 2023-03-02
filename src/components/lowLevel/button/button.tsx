import {Button as RawButton} from '@kobalte/core';
import {clsx} from 'clsx';
import {type ParentProps, splitProps} from 'solid-js';
import './button.sass';

type Color =
	| 'primary'
	| 'link'
	| 'info'
	| 'success'
	| 'warning'
	| 'danger'
	| 'dark'
	| 'text';

type Sizes = 'small' | 'normal' | 'medium' | 'large';

type Props = Parameters<typeof RawButton.Root>['0'] & {
	/** The button is available in all the different colors defined by the $colors Sass map. */
	color?: Color;
	/** Each color now comes in its light version. Simply append the modifier is-light to the color modifier to apply the light version of the button. */
	lightColor?: boolean;
	/**
		The button comes in 4 different sizes:

			small
			normal
			medium
			large

		While the default size is the normal one, the is-normal modifier exists in case you need to reset the button to its normal size.
	 */
	size?: Sizes;
	isOutlined?: boolean;
	/** Inverted (the text color becomes the background color, and vice-versa) */
	isInverted?: boolean;
	/** Rounded buttons */
	isRounded?: boolean;
	/** You can very easily turn a button into its loading version by appending the is-loading modifier. You don't even need to remove the inner text, which allows the button to maintain its original size between its default and loading states. */
	isLoading?: boolean;
	/** You can create a non-interactive button by using the is-static modifier. This is useful to align a text label with an input, for example when using form addons. */
	isStatic?: boolean;
};

function Button(props: ParentProps<Props>) {
	const [childrenProps, propsWithoutChildren] = splitProps(props, ['children']);
	const [local, others] = splitProps(propsWithoutChildren, [
		'color',
		'lightColor',
		'size',
		'isOutlined',
		'isInverted',
		'isRounded',
		'isLoading',
		'isStatic',
	]);
	return (
		<RawButton.Root
			{...others}
			class={clsx(
				'button',
				local.color && `is-${local.color}`,
				local.lightColor && 'is-light',
				local.size && `is-${local.size}`,
				local.isOutlined && 'is-outlined',
				local.isInverted && 'is-inverted',
				local.isRounded && 'is-rounded',
				local.isLoading && 'is-loading',
				local.isStatic && 'is-static',
			)}
		>
			{childrenProps.children}
		</RawButton.Root>
	);
}

// Function ButtonGroup() 'buttons are-large'

export default Button;
