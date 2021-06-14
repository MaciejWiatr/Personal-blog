import { sdk } from './client';

it('GQL sdk should have queries methods', () => {
    expect(typeof sdk.getAllPosts).toBe('function');
    expect(typeof sdk.getPostBySlug).toBe('function');
});
