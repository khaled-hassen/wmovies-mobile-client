import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
	NavigationContainer,
	Theme,
	DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TStackScreens } from './app/config/types';
import MovieScreen from './app/screens/MovieScreen';
import HomeScreens from './app/screens/HomeScreens';
import Search from './app/screens/Search';
import { TextInput } from 'react-native-gesture-handler';

// TODO handle errors
// TODO polish the website
// TODO optimize the app
// TODO add swipe up to refresh in every screen

const client = new ApolloClient({
	uri: 'https://wmovies-api.herokuapp.com/graphql',
	cache: new InMemoryCache(),
});

// NAVIGATION
const Stack = createStackNavigator<TStackScreens>();

const App: React.FC = () => {
	const [movieSearch, setMovieSearch] = useState('');

	return (
		<SafeAreaView style={styles.container}>
			<ApolloProvider client={client}>
				<NavigationContainer theme={theme}>
					<Stack.Navigator initialRouteName="Home">
						<Stack.Screen
							name="Home"
							component={HomeScreens}
							options={({ navigation }) => ({
								headerRight: () => (
									<Button
										title="Search"
										onPress={() =>
											navigation.navigate('Search')
										}
									/>
								),
							})}
						/>
						<Stack.Screen
							name="Movie"
							component={MovieScreen}
							options={({ route }) => ({
								title: route.params.title,
							})}
						/>
						<Stack.Screen
							listeners={{
								beforeRemove: () => setMovieSearch(''),
							}}
							name="Search"
							options={{
								headerRight: () => (
									<TextInput
										placeholder="Search movie"
										value={movieSearch}
										onChangeText={(val) =>
											setMovieSearch(val)
										}
									/>
								),
							}}
						>
							{(props) => (
								<Search {...props} movie={movieSearch} />
							)}
						</Stack.Screen>
					</Stack.Navigator>
				</NavigationContainer>
				<StatusBar style="light" />
			</ApolloProvider>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

const theme: Theme = {
	...DarkTheme,
};

export default App;
