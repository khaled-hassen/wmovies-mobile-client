import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TStackScreens } from './app/config/types';
import MovieScreen from './app/screens/MovieScreen';
import HomeScreens from './app/screens/HomeScreens';

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
	return (
		<SafeAreaView style={styles.container}>
			<ApolloProvider client={client}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Home">
						<Stack.Screen name="Home" component={HomeScreens} />
						<Stack.Screen
							name="Movie"
							component={MovieScreen}
							options={({ route }) => ({
								title: route.params.title,
							})}
						/>
					</Stack.Navigator>
				</NavigationContainer>
				<StatusBar style="auto" />
			</ApolloProvider>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
