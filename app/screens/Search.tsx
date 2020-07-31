import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import { SEARCH_MOVIES } from '../graphql/queries';
import MoviesListContainer from '../components/MoviesListContainer';
import { TStackScreens } from '../config/types';

// PROPS TYPES
interface Props {
	movie: string;
	navigation: StackNavigationProp<TStackScreens, 'Search'>;
}

// COMPONENT
const Search: React.FC<Props> = (props) => {
	const { data, loading, error } = useQuery(SEARCH_MOVIES, {
		variables: { title: props.movie },
	});

	return (
		<View style={styles.container}>
			{(!data || !data.search || data.search.length === 0) && !loading ? (
				<View style={styles.noResultContainer}>
					<MaterialIcons
						name="error-outline"
						size={100}
						color="#FEFEFE"
					/>
					<Text style={styles.noResultText}>No movies found</Text>
				</View>
			) : (
				<MoviesListContainer
					totalMovies={0}
					onMovieSelected={(id, title) =>
						props.navigation.navigate('Movie', { id, title })
					}
					loading={props.movie.length === 0 ? false : loading}
					movies={data ? data.search : []}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1 },
	noResultContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noResultText: { color: '#FEFEFE', fontSize: 30, marginTop: 30 },
});

export default Search;
