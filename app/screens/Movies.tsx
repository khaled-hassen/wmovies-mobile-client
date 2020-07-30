import React, { useRef } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_MOVIES, GET_MOVIES_NUMBER } from '../graphql/queries';
import { layout, MOVIES_LOADED_PER_REQUEST } from '../config/config';
import MoviesListContainer from '../components/MoviesListContainer';
import { IMovie } from '../config/types';

// PROPS TYPES
interface Props {
	flatList?: React.RefObject<FlatList<IMovie>>;
	onMovieSelected: (id: string, title: string) => void;
}

// COMPONENT
const Movies: React.FC<Props> = (props) => {
	const queryPosition = useRef(0);

	const { data, loading, error, fetchMore, refetch } = useQuery(GET_MOVIES, {
		variables: { pos: 0, count: MOVIES_LOADED_PER_REQUEST },
	});
	const { data: numberData, loading: numberLoading } = useQuery(
		GET_MOVIES_NUMBER
	);

	const handlePress = async () => {
		queryPosition.current =
			queryPosition.current + MOVIES_LOADED_PER_REQUEST - 1;

		await fetchMore({
			variables: {
				pos: queryPosition.current,
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

	const handleRefresh = async () => {
		await refetch({
			pos: 0,
			count: MOVIES_LOADED_PER_REQUEST,
		});
	};

	return (
		<View style={styles.container}>
			<MoviesListContainer
				flatList={props.flatList}
				onRefresh={handleRefresh}
				onMovieSelected={props.onMovieSelected}
				totalMovies={
					numberData && !numberLoading
						? numberData.moviesNumber
						: undefined
				}
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

export default Movies;
