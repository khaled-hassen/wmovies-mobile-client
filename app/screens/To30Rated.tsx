import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GET_TOP_RATED } from '../graphql/queries';
import { useQuery } from '@apollo/client';

import { layout } from '../config/config';
import MoviesListContainer from '../components/MoviesListContainer';

// PROPS TYPES
interface Props {}

// COMPONENT
const To30Rated: React.FC<Props> = (props) => {
	const { data, loading, error } = useQuery(GET_TOP_RATED);

	return (
		<View style={styles.container}>
			<MoviesListContainer
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
