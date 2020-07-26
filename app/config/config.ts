import { Platform } from 'react-native';

// IMMUTABLE GLOBAL VARIABLES
export const MOVIES_LOADED_PER_REQUEST = 10;
export const ALPHABET = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];
export const GENRES = [
	'War',
	'Drama',
	'Comedy',
	'Horror',
	'Romance',
	'Thriller',
	'History',
	'Action',
	'Documentary',
	'Animation',
	'Western',
	'Crime',
	'Action & Adventure',
	'Adventure',
	'Sci-Fi',
	'Mystery',
	'Music',
	'Musical',
	'Biography',
	'Family',
	'Fantasy',
	'Sport',
	'News',
	'TV Movie',
	'Talk',
	'Reality',
	'Soap',
	'Science Fiction',
	'Foreign',
];

// STYLES
export const colors = {
	dark: '#1b262c',
	light: '#FFF',
};

export const layout = {
	paddingTop: Platform.OS === 'android' ? 50 : 0,
};
