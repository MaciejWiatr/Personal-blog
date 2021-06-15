/* eslint-env jest */
import { render } from '@testing-library/react';
import { PrimaryText } from './typography';

it('Primary text should render text', () => {
    const { getByText } = render(<PrimaryText>hello</PrimaryText>);
    const textElement = getByText('hello');

    expect(textElement).toBeTruthy();
});
