import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { layout, MOVIES_LOADED_PER_REQUEST } from '../config/config';
import { useQuery } from '@apollo/client';
import { Picker } from '@react-native-community/picker';

import { GET_MOVIES_BY_LETTER } from '../graphql/queries';
import MoviesListContainer from '../components/MoviesListContainer';

// TODO add letter selection

// PROPS TYPES
interface Props {}

// COMPONENT
const AZ: React.FC<Props> = (props) => {
	const [activeLetter, setActiveLetter] = useState('A');
	const loadedMovies = useRef(10);

	const { data, loading, error, fetchMore } = useQuery(GET_MOVIES_BY_LETTER, {
		variables: {
			letter: activeLetter,
			pos: 0,
			count: MOVIES_LOADED_PER_REQUEST,
		},
	});

	const handlePress = () => {
		loadedMovies.current = loadedMovies.current + MOVIES_LOADED_PER_REQUEST;

		return fetchMore({
			variables: {
				letter: activeLetter,
				pos: loadedMovies.current - 1,
				count: MOVIES_LOADED_PER_REQUEST,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				return Object.assign({}, prev, {
					moviesByLetter: [
						...prev.moviesByLetter,
						...fetchMoreResult.moviesByLetter,
					],
				});
			},
		});
	};

	return (
		<View style={styles.container}>
			<Picker
				selectedValue={activeLetter}
				style={{ height: 50, width: 100, backgroundColor: 'black' }}
				onValueChange={(letter) => setActiveLetter(letter.toString())}
			>
				<Picker.Item label="Java" value="java" />
				<Picker.Item label="Java" value="java" />
				<Picker.Item label="Java" value="java" />
				<Picker.Item label="Java" value="java" />
				<Picker.Item label="Java" value="java" />
				<Picker.Item label="Java" value="java" />
				<Picker.Item label="Java" value="java" />
			</Picker>
			<MoviesListContainer
				loading={loading}
				movies={data ? data.moviesByLetter : []}
				onMorePressed={handlePress}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: layout.paddingTop,
	},
});

export default AZ;
