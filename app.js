/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createPost } from './fetch-utils.js';
/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const postForm = document.getElementById('post-form');

/* State */
let error = null;
/* Events */

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);

    const insertPost = {
        post: formData.get('post-text'),
    };

    const response = await createPost(insertPost);
    error = response.error;

    if (error) {
        displayError();
    } else {
        postForm.reset();
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
