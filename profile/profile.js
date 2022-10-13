import '../auth/user.js';
import { updateProfile } from '../fetch-utils.js';
import { uploadImage } from '../fetch-utils.js';
import { getUser } from '../fetch-utils.js';

const errorDisplay = document.getElementById('error-display');
const profileForm = document.getElementById('profile-form');
const uploadButton = document.getElementById('avatar-input');
const previewImage = document.getElementById('preview-image');

let error = null;
let user = getUser();
console.log(user);
profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(profileForm);
    let url = null;

    const imageFile = formData.get('image');
    if (imageFile) {
        const randomFolder = Math.floor(Date.now() * Math.random());
        console.log(imageFile);
        const imagePath = `avatarbicket/${randomFolder}/${imageFile.name}`;
        url = await uploadImage('avatarbicket', imagePath, imageFile);
    }

    const profile = {
        username: formData.get('username'),
        color: formData.get('color'),
        image_url: url,
        user_id: user.id,
    };

    const response = await updateProfile(profile);
    console.log(response);
    error = response.error;

    if (error) {
        displayError();
    } else {
        // location.assign('/');
    }
});

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
