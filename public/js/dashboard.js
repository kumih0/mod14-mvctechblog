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
    if (event.target.hasAttribute('data-delId')) {
        const id = event.target.getAttribute('data-delId');

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
    if (event.target.hasAttribute('data-editId')) {
        const id = event.target.getAttribute('data-editId');

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

document.querySelector('.blogpost-form').addEventListener('submit', newBlogpostHandler);
document.querySelector('#del-btn').addEventListener('click', deleteBlogpostHandler);
document.querySelector('#edit-btn').addEventListener('click', editBlogpostRender);
