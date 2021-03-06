import { gql } from 'graphql-request';

const getAllPostsQuery = gql`
    query getAllPosts {
        posts {
            createdAt
            slug
            title
            coverImage {
                url
            }
            content {
                text
            }
            author {
                name
            }
            id
            tags
        }
    }
`;

const getPostBySlugQuery = gql`
    query getPostBySlug($slug: String!) {
        post(where: { slug: $slug }) {
            title
            tags
            slug
            coverImage {
                url
            }
            author {
                name
            }
            content {
                markdown
                html
            }
            tags
        }
    }
`;

export { getAllPostsQuery, getPostBySlugQuery };
