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

export const GET_TOP_RATED = gql`
	{
		top30Rated {
			id
			title
			img {
				src
			}
		}
	}
`;

export const GET_MOVIES_BY_LETTER = gql`
	query MoviesByLetter($letter: String!, $pos: Int!, $count: Int!) {
		moviesByLetter(letter: $letter, pos: $pos, count: $count) {
			id
			title
			img {
				src
			}
		}
	}
`;
