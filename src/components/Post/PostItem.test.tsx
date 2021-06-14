import { render } from '@testing-library/react';
import PostItem from './PostItem';

it('PostItem should properly render', () => {
    const testText = 'postitem-test';
    const testImage = 'http://placecorgi.com/260/180';

    const { getByRole, getByText } = render(
        <PostItem text={testText} title={testText} url={testImage} />
    );

    const title = getByText(testText);
    expect(title).toBeTruthy();
    const image = getByRole('img');
    expect(image.getAttribute('src')).toBe(testImage);
    const readingTime = getByText('1 min read');
    expect(readingTime).toBeTruthy();
});
