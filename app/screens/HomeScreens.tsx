import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

import Movies from './Movies';
import { THomeTabScreens, TStackScreens } from '../config/types';
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
	const handleMovieSelected = (id: string, title: string) => {
		navigation.navigate('Movie', { id, title });
	};

	return (
		<Tabs.Navigator initialRouteName="Movies">
			<Tabs.Screen name="Movies">
				{(props) => (
					<Movies {...props} onMovieSelected={handleMovieSelected} />
				)}
			</Tabs.Screen>
			<Tabs.Screen name="To30Rated">
				{(props) => (
					<To30Rated
						{...props}
						onMovieSelected={handleMovieSelected}
					/>
				)}
			</Tabs.Screen>
			<Tabs.Screen name="AZ">
				{(props) => (
					<AZ {...props} onMovieSelected={handleMovieSelected} />
				)}
			</Tabs.Screen>
			<Tabs.Screen name="Genre">
				{(props) => (
					<Genre {...props} onMovieSelected={handleMovieSelected} />
				)}
			</Tabs.Screen>
		</Tabs.Navigator>
	);
};

const styles = StyleSheet.create({ container: {} });

export default HomeScreens;
