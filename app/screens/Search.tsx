import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';

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
			<MoviesListContainer
				totalMovies={0}
				onMovieSelected={(id, title) =>
					props.navigation.navigate('Movie', { id, title })
				}
				loading={props.movie.length === 0 ? false : loading}
				movies={data ? data.search : []}
			/>
		</View>
	);
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default Search;
