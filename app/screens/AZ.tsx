import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { layout, MOVIES_LOADED_PER_REQUEST, ALPHABET } from '../config/config';
import { useQuery } from '@apollo/client';
import { Picker } from '@react-native-community/picker';

import {
	GET_MOVIES_BY_LETTER,
	GET_MOVIES_NUMBER_BY_LETTER,
} from '../graphql/queries';
import MoviesListContainer from '../components/MoviesListContainer';
import { IMovie } from '../config/types';

// TODO add letter selection

// PROPS TYPES
interface Props {
	flatList?: React.RefObject<FlatList<IMovie>>;
	onMovieSelected: (id: string, title: string) => void;
}

// COMPONENT
const AZ: React.FC<Props> = (props) => {
	const [activeLetter, setActiveLetter] = useState('A');
	const queryPosition = useRef(0);

	const { data, loading, error, fetchMore, refetch } = useQuery(
		GET_MOVIES_BY_LETTER,
		{
			variables: {
				letter: activeLetter,
				pos: 0,
				count: MOVIES_LOADED_PER_REQUEST,
			},
		}
	);
	const { data: numberData, loading: numberLoading } = useQuery(
		GET_MOVIES_NUMBER_BY_LETTER,
		{
			variables: { letter: activeLetter },
		}
	);

	const handlePress = async () => {
		queryPosition.current =
			queryPosition.current + MOVIES_LOADED_PER_REQUEST - 1;

		await fetchMore({
			variables: {
				letter: activeLetter,
				pos: queryPosition.current,
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

	const handleRefresh = () => {};

	useEffect(() => {
		queryPosition.current = 0;
	}, [activeLetter]);

	return (
		<View style={styles.container}>
			<Picker
				selectedValue={activeLetter}
				style={{
					height: 50,
					width: 150,
					backgroundColor: 'white',
					alignSelf: 'center',
				}}
				onValueChange={(letter) => setActiveLetter(letter.toString())}
			>
				{ALPHABET.map((letter) => (
					<Picker.Item label={letter} value={letter} key={letter} />
				))}
			</Picker>
			<MoviesListContainer
				flatList={props.flatList}
				onRefresh={handleRefresh}
				onMovieSelected={props.onMovieSelected}
				totalMovies={
					numberData && !numberLoading
						? numberData.moviesByLetterNumber
						: undefined
				}
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
