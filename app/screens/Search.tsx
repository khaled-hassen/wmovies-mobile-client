import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';

import { SEARCH_MOVIES } from '../graphql/queries';
import MoviesListContainer from '../components/MoviesListContainer';
import { TStackScreens } from '../config/types';
import NoMoviesError from '../components/NoMoviesError';

// PROPS TYPES
interface Props {
	movie: string;
	isInternetReachable: boolean;
	navigation: StackNavigationProp<TStackScreens, 'Search'>;
}

// COMPONENT
const Search: React.FC<Props> = (props) => {
	const { data, loading } = useQuery(SEARCH_MOVIES, {
		variables: { title: props.movie },
	});

	return (
		<View style={styles.container}>
			{(!data || !data.search || data.search.length === 0) && !loading ? (
				<NoMoviesError />
			) : (
				<MoviesListContainer
					totalMovies={0}
					onMovieSelected={(id, title) => {
						if (props.isInternetReachable)
							props.navigation.navigate('Movie', {
								id,
								title,
							});
					}}
					loading={props.movie.length === 0 ? false : loading}
					movies={data ? data.search : []}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1 },
});

export default Search;
