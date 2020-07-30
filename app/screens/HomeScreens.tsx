import React, { useRef } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import {
	MaterialCommunityIcons,
	AntDesign,
	MaterialIcons,
} from '@expo/vector-icons';

import Movies from './Movies';
import { THomeTabScreens, TStackScreens, IMovie } from '../config/types';
import { colors } from '../config/config';
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

	const getIconColor = (focused: boolean) =>
		focused ? colors.activeColor : colors.inactiveColor;

	const handleMovieSelected = (id: string, title: string) => {
		navigation.navigate('Movie', { id, title });
	};

	return (
		<Tabs.Navigator
			initialRouteName="Movies"
			tabBarOptions={{
				activeTintColor: colors.activeColor,
				inactiveTintColor: colors.inactiveColor,
				labelStyle: { fontSize: 12 },
			}}
		>
			<Tabs.Screen
				name="Movies"
				listeners={listeners}
				options={{
					tabBarIcon: (props) => (
						<MaterialCommunityIcons
							name="library-movie"
							size={24}
							color={getIconColor(props.focused)}
						/>
					),
				}}
			>
				{(props) => (
					<Movies
						{...props}
						onMovieSelected={handleMovieSelected}
						flatList={flatList}
					/>
				)}
			</Tabs.Screen>
			<Tabs.Screen
				name="To30Rated"
				listeners={listeners}
				options={{
					tabBarIcon: (props) => (
						<AntDesign
							name="Trophy"
							size={24}
							color={getIconColor(props.focused)}
						/>
					),
				}}
			>
				{(props) => (
					<To30Rated
						{...props}
						onMovieSelected={handleMovieSelected}
						flatList={flatList}
					/>
				)}
			</Tabs.Screen>
			<Tabs.Screen
				name="AZ"
				listeners={listeners}
				options={{
					tabBarIcon: (props) => (
						<MaterialCommunityIcons
							name="sort-alphabetical"
							size={24}
							color={getIconColor(props.focused)}
						/>
					),
				}}
			>
				{(props) => (
					<AZ
						{...props}
						onMovieSelected={handleMovieSelected}
						flatList={flatList}
					/>
				)}
			</Tabs.Screen>
			<Tabs.Screen
				name="Genre"
				listeners={listeners}
				options={{
					tabBarIcon: (props) => (
						<MaterialIcons
							name="chrome-reader-mode"
							size={24}
							color={
								props.focused
									? colors.activeColor
									: colors.inactiveColor
							}
						/>
					),
				}}
			>
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
