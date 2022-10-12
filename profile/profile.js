import '../auth/user.js';
import { updateProfile } from '../fetch-utils.js';

const errorDisplay = document.getElementById('error-display');
const profileForm = document.getElementById('profile-form');
const uploadButton = document.getElementById('avatar-input');
const previewImage = document.getElementById('preview-image');





uploadButton.addEventListener('change', () => {
    const file = uploadButton.files[0];

    if (file) {
        previewImage.src = URL.createObjectURL(file);
    } else {
        previewImage.src = '../assets/user.png';
    }
});






function displayError() {
    errorDisplay.textContent = error.message;
}