import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
	query Movies($pos: Int!, $count: Int!) {
		movies(pos: $pos, count: $count) {
			id
			title
			img {
				src
			}
		}
	}
`;
