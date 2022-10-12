/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createPost } from './fetch-utils.js';
import { renderPost } from './render-utils.js';
import { getPosts } from './fetch-utils.js';
import { onMessage } from './fetch-utils.js';
import { getPost } from './fetch-utils.js';
/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const postForm = document.getElementById('post-form');
const postList = document.getElementById('post-list');

/* State */
let error = null;
let posts = [];
/* Events */

window.addEventListener('load', async () => {
    const response = await getPosts();
    error = response.error;
    posts = response.data;

    if (error) {
        displayError();
    } else {
        displayPosts();
    }
    onMessage(async (payload) => {
        const postId = payload.new.id;
        const postResponse = await getPost(postId);
        error = postResponse.error;

        if (error) {
            displayError();
        } else {
            const post = postResponse.data;
            posts.push(post);
            displayPosts();
        }
    });
});

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

function displayPosts() {
    postList.innerHTML = '';

    for (const post of posts) {
        const postEl = renderPost(post);
        postList.append(postEl);
    }
}

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
