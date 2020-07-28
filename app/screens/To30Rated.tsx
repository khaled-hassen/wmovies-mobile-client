import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { GET_TOP_RATED } from '../graphql/queries';
import { useQuery } from '@apollo/client';

import { layout } from '../config/config';
import MoviesListContainer from '../components/MoviesListContainer';
import { IMovie } from '../config/types';

// PROPS TYPES
interface Props {
	flatList?: React.RefObject<FlatList<IMovie>>;
	onMovieSelected: (id: string, title: string) => void;
}

// COMPONENT
const To30Rated: React.FC<Props> = (props) => {
	const { data, loading, error, refetch } = useQuery(GET_TOP_RATED);

	const handleRefresh = () => {};

	return (
		<View style={styles.container}>
			<MoviesListContainer
				flatList={props.flatList}
				onRefresh={handleRefresh}
				onMovieSelected={props.onMovieSelected}
				totalMovies={30}
				loading={loading}
				movies={data ? data.top30Rated : []}
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

export default To30Rated;
