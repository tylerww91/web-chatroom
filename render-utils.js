export function renderPost(post) {
    const li = document.createElement('li');
    li.classList.add('post');

    const div = document.createElement('div');
    div.classList.add('user');
    div.classList.add(`${post.user_id.color}`);
    div.textContent = post.user_id.username;

    const img = document.createElement('img');
    img.src = post.user_id.image_url;
    img.classList.add('avatar-image');

    const p = document.createElement('p');
    p.textContent = post.post;

    li.append(img, div, p);
    return li;
}
