import { gql } from "graphql-request";

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
			id
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
			}
		}
	}
`;

export { getAllPostsQuery, getPostBySlugQuery };
