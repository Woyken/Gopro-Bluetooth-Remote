/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import { AppProvider } from '../AppProvider';

describe('<AppProvider />', () => {
    it('renders without errors', () => {
        render(<AppProvider />);
    });
});
