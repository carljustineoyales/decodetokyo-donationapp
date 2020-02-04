

export const withToken = () => {
	return sessionStorage.getItem( 'JWT' );
};
export const getUserName = () => {
	return sessionStorage.getItem( 'username' );
};
export const getRole = () => {
	return sessionStorage.getItem('role');
};
export const getId = () => {
	return sessionStorage.getItem('id');
}

// export const URL = 'https://donationapptest.localhost'; //Change this when deploying
export const strapi = 'http://localhost:1337'; //Change this when deploying
// export const strapi = 'https://limitless-brushlands-81295.herokuapp.com';
