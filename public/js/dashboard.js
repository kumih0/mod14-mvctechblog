const { BlogPost } = require("../../models");

const newBlogpostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blogpost-title').value.trim();
    const content = document.querySelector('#blogpost-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/blogposts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
};

const deleteBlogpostHandler = async (event) => {
    if (event.target.hasAttribute('data-delIdp')) {
        const id = event.target.getAttribute('data-delIdp');

        const response = await fetch(`/api/blogposts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
};


const editBlogpostRender = async (event) => {
    if (event.target.hasAttribute('data-editIdp')) {
        const id = event.target.getAttribute('data-editIdp');

        const blogpostData = await BlogPost.findOne({
            where: {
                id: id,
            },
        });

        if (blogpostData) {
            document.querySelector('#form-header').textContent = 'Edit Blogpost';
            document.querySelector('#blogpost-title').value = blogpostData.title;
            document.querySelector('#blogpost-content').value = blogpostData.content;

            document.querySelector('#post-btn').textContent = 'Save Changes';
        }

        document.querySelector('#post-btn').addEventListener('click', editBlogpostHandler);

    }
};

const editBlogpostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#blogpost-title').value.trim();
    const content = document.querySelector('#blogpost-content').value.trim();

    const response = await fetch(`/api/blogposts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else {
        alert(response.statusText);
    }
};

const editCommentRender = async (event) => {
    if (event.target.hasAttribute('data-editIdc')) {
        const id = event.target.getAttribute('data-editIdc');

        const commentData = await Comment.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: BlogPost,
                    attributes: ['title'],
                },
            ],
        });

        if (commentData) {
            document.querySelector('#form-header').textContent = 'Edit Comment';
            document.querySelector('#blogpost-title').value = commentData.title;
            document.querySelector('#blogpost-content').value = commentData.content;

            document.querySelector('#post-btn').textContent = 'Save Changes';
        }

        const editCommentHandler = async (event) => {
            event.preventDefault();

            const updatedComment = document.querySelector('#blogpost-content').value.trim();
            const response = await fetch(`/api/comments/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ updatedComment }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText);
            }
        };
        document.querySelector('#post-btn').addEventListener('click', editCommentHandler);
    }
};

const deleteCommentHandler = async (event) => {
    if (event.target.hasAttribute('data-delIdc')) {
        const id = event.target.getAttribute('data-delIdc');

        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.blogpost-form').addEventListener('submit', newBlogpostHandler);
document.querySelector('#del-btn-bp').addEventListener('click', deleteBlogpostHandler);
document.querySelector('#edit-btn-bp').addEventListener('click', editBlogpostRender);
document.querySelector('#del-btn-c').addEventListener('click', deleteCommentHandler);
document.querySelector('#edit-btn-c').addEventListener('click', editCommentRender);