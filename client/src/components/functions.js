import axios from 'axios'

export const withToken = () => {
	return localStorage.getItem( 'JWT' );
};
export const getUserName = () => {
	return localStorage.getItem( 'username' );
};
export const getRole = () => {
	return localStorage.getItem('role');
};
export const getId = () => {
	return localStorage.getItem('id');
}




// export const URL = 'https://donationapptest.localhost'; //Change this when deploying
export const strapi = 'http://localhost:1337'; //Change this when deploying
// export const strapi = 'https://limitless-brushlands-81295.herokuapp.com';
