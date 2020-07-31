import React, { useCallback, useState } from 'react';
import {
	StyleSheet,
	FlatList,
	useWindowDimensions,
	View,
	RefreshControl,
	ActivityIndicator,
} from 'react-native';

import MovieCard from './MovieCard';
import { IMovie } from '../config/types';
import MoreButton from './MoreButton';

// PROPS TYPES
interface Props {
	flatList?: React.RefObject<FlatList<IMovie>>;
	onMorePressed?: () => Promise<void>;
	movies: IMovie[] | [];
	loading: boolean;
	totalMovies: number;
	onRefresh?: () => Promise<void>;
	onMovieSelected: (id: string, title: string) => void;
}

const MISSING = 'MISSING';
const getMissingItems = (totalItems: number, itemsPerRow: number) => {
	const rowsNumber = Math.ceil(totalItems / itemsPerRow);
	const fullRowsItems = rowsNumber * itemsPerRow; // items number if all rows are full
	const missingItemsNumber = fullRowsItems - totalItems;

	const missingMovies: IMovie[] = [];
	for (let i = 0; i < missingItemsNumber; ++i) {
		missingMovies.push({ id: MISSING, title: '', img: { src: '' } });
	}

	return missingMovies;
};

// COMPONENT
const MoviesListContainer: React.FC<Props> = (props) => {
	const renderMovie = useCallback(
		({ item }: { item: IMovie }) => (
			<MovieCard
				missing={item.id === MISSING}
				onMovieSelected={props.onMovieSelected}
				id={item.id}
				title={item.title}
				img={item.img}
			/>
		),
		[]
	);

	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(false);
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();
	const numColumns = Math.floor(screenWidth / 153);

	const handleRefresh = async () => {
		if (!props.onRefresh) return;

		setRefreshing(true);
		try {
			await props.onRefresh();
			setRefreshing(false);
		} catch {
			setRefreshing(false);
		}
	};

	const handleOnPress = async () => {
		if (props.onMorePressed) {
			setLoading(true);
			try {
				await props.onMorePressed();
				setLoading(false);
			} catch {
				setLoading(false);
			}
		}
	};

	return (
		<React.Fragment>
			{props.loading ? (
				<View style={styles.loader}>
					<ActivityIndicator size="large" color="#FEFEFE" />
				</View>
			) : (
				<React.Fragment>
					<FlatList
						ref={props.flatList}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={handleRefresh}
								colors={[
									'#845EC2',
									'#D65DB1',
									'#FF6F91',
									'#FF9671',
									'#FFC75F',
								]}
							/>
						}
						contentContainerStyle={styles.container}
						keyExtractor={(movie) => movie.id}
						data={[
							...props.movies,
							...getMissingItems(props.movies.length, numColumns),
						]}
						renderItem={renderMovie}
						key={
							screenHeight >= screenWidth
								? 'portrait'
								: 'landscape'
						}
						numColumns={numColumns}
						ListFooterComponent={
							props.onMorePressed &&
							props.movies.length < props.totalMovies ? (
								<MoreButton
									onPress={handleOnPress}
									loading={loading}
								/>
							) : null
						}
					/>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default MoviesListContainer;
