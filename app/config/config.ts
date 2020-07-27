import { Platform } from 'react-native';

// IMMUTABLE GLOBAL VARIABLES
export const MOVIES_LOADED_PER_REQUEST = 30;
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
	'Action',
	'Action & Adventure',
	'Adventure',
	'Animation',
	'Biography',
	'Comedy',
	'Crime',
	'Documentary',
	'Drama',
	'Family',
	'Fantasy',
	'Foreign',
	'History',
	'Horror',
	'Music',
	'Musical',
	'Mystery',
	'News',
	'Reality',
	'Romance',
	'Sci-Fi',
	'Science Fiction',
	'Soap',
	'Sport',
	'TV Movie',
	'Talk',
	'Thriller',
	'War',
	'Western',
];

// STYLES
export const colors = {
	dark: '#1b262c',
	light: '#FFF',
};

export const layout = {
	paddingTop: Platform.OS === 'android' ? 50 : 0,
};
