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

export const GET_MOVIES_NUMBER = gql`
	{
		moviesNumber
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

export const GET_MOVIES_NUMBER_BY_LETTER = gql`
	query MoviesByLetterNumber($letter: String!) {
		moviesByLetterNumber(letter: $letter)
	}
`;

export const GET_MOVIES_BY_GENRE = gql`
	query MoviesByGenre($genre: String!, $pos: Int!, $count: Int!) {
		moviesByGenre(genre: $genre, pos: $pos, count: $count) {
			id
			title
			img {
				src
			}
		}
	}
`;

export const GET_MOVIES_NUMBER_BY_GENDER = gql`
	query MoviesByGenreNumber($genre: String!) {
		moviesByGenreNumber(genre: $genre)
	}
`;

export const GET_MOVIE = gql`
	query GetMovie($id: ID!) {
		movie(id: $id) {
			title
			year
			genre
			director
			streamLink
			rating
			img {
				src
			}
			description
			duration
		}
	}
`;

export const SEARCH_MOVIES = gql`
	query Search($title: String!) {
		search(title: $title) {
			id
			title
			img {
				src
			}
		}
	}
`;
