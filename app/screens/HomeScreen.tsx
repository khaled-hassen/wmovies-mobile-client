import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_MOVIES } from '../graphql/queries';
import { layout, MOVIES_LOADED_PER_REQUEST } from '../config/config';
import MoviesListContainer from '../components/MoviesListContainer';

// PROPS TYPES
interface Props {}

// COMPONENT
const HomeScreen: React.FC<Props> = (props) => {
	const loadedMovies = useRef(10);

	const { data, loading, error, fetchMore } = useQuery(GET_MOVIES, {
		variables: { pos: 0, count: MOVIES_LOADED_PER_REQUEST },
	});

	const handlePress = () => {
		loadedMovies.current = loadedMovies.current + MOVIES_LOADED_PER_REQUEST;

		return fetchMore({
			variables: {
				pos: loadedMovies.current,
				count: MOVIES_LOADED_PER_REQUEST,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				return Object.assign({}, prev, {
					movies: [...prev.movies, ...fetchMoreResult.movies],
				});
			},
		});
	};

	return (
		<View style={styles.container}>
			<MoviesListContainer
				loading={loading}
				movies={data ? data.movies : []}
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

export default HomeScreen;
