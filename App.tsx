import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './app/screens/HomeScreen';
import colors from './app/config/colors';
import { TRootScreens } from './app/config/types';
import To30Rated from './app/screens/To30Rated';
import AZ from './app/screens/AZ';

// TODO polish the website

const client = new ApolloClient({
	uri: 'https://wmovies-api.herokuapp.com/graphql',
	cache: new InMemoryCache(),
});

const Tabs = createBottomTabNavigator<TRootScreens>();

const App: React.FC = () => {
	return (
		<SafeAreaView style={styles.container}>
			<ApolloProvider client={client}>
				<NavigationContainer>
					<Tabs.Navigator initialRouteName="Home">
						<Tabs.Screen name="Home" component={HomeScreen} />
						<Tabs.Screen name="To30Rated" component={To30Rated} />
						<Tabs.Screen name="AZ" component={AZ} />
					</Tabs.Navigator>
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
