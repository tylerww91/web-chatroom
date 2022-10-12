export function renderPost(post) {
    const li = document.createElement('li');
    li.classList.add('post');

    const div = document.createElement('div');
    div.classList.add('user');
    div.textContent = post.user_id;

    const p = document.createElement('p');
    p.textContent = post.post;

    li.append(div, p);
    return li;
}
