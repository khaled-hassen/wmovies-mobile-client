export interface IMovie {
	id: string;
	title: string;
	img: { src: string };
}

export type THomeTabScreens = {
	Movies: undefined;
	AZ: undefined;
	To30Rated: undefined;
	Genre: undefined;
};

export type TStackScreens = {
	Home: undefined;
	Movie: { id: string; title: string };
};
