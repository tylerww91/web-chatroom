export function renderPost(post) {
    const li = document.createElement('li');
    li.classList.add('post');

    const bigDiv = document.createElement('div');
    bigDiv.classList.add('userEl');

    const div = document.createElement('div');
    div.classList.add('user');
    div.classList.add(`${post.user_id.color}`);
    div.textContent = post.user_id.username;

    const img = document.createElement('img');
    img.src = post.user_id.image_url;
    img.classList.add('avatar-image');

    const p = document.createElement('p');
    p.textContent = post.post;
    p.classList.add('textp');

    bigDiv.append(img, div);
    li.append(bigDiv, p);
    return li;
}
