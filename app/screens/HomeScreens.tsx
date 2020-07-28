import React, { useRef } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

import Movies from './Movies';
import { THomeTabScreens, TStackScreens, IMovie } from '../config/types';
import To30Rated from './To30Rated';
import AZ from './AZ';
import Genre from './Genre';

const Tabs = createBottomTabNavigator<THomeTabScreens>();

// PROPS TYPES
interface Props {
	navigation: StackNavigationProp<TStackScreens, 'Home'>;
}

// COMPONENT
const HomeScreens: React.FC<Props> = ({ navigation }) => {
	const flatList = useRef<FlatList<IMovie>>(null);
	const listeners = {
		tabPress: () =>
			flatList.current?.scrollToIndex({
				index: 0,
				animated: true,
			}),
	};

	const handleMovieSelected = (id: string, title: string) => {
		navigation.navigate('Movie', { id, title });
	};

	return (
		<Tabs.Navigator initialRouteName="Movies">
			<Tabs.Screen name="Movies" listeners={listeners}>
				{(props) => (
					<Movies
						{...props}
						onMovieSelected={handleMovieSelected}
						flatList={flatList}
					/>
				)}
			</Tabs.Screen>
			<Tabs.Screen name="To30Rated" listeners={listeners}>
				{(props) => (
					<To30Rated
						{...props}
						onMovieSelected={handleMovieSelected}
						flatList={flatList}
					/>
				)}
			</Tabs.Screen>
			<Tabs.Screen name="AZ" listeners={listeners}>
				{(props) => (
					<AZ
						{...props}
						onMovieSelected={handleMovieSelected}
						flatList={flatList}
					/>
				)}
			</Tabs.Screen>
			<Tabs.Screen name="Genre" listeners={listeners}>
				{(props) => (
					<Genre
						{...props}
						onMovieSelected={handleMovieSelected}
						flatList={flatList}
					/>
				)}
			</Tabs.Screen>
		</Tabs.Navigator>
	);
};

const styles = StyleSheet.create({ container: {} });

export default HomeScreens;
