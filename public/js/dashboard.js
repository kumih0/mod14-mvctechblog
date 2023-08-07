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
    if(event.target.hasAttribute('data-delId')) {
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


const editBlogpostHandler = async (event) => {
    if(event.target.hasAttribute('data-editId')) {
        const id = event.target.getAttribute('data-editId');


    }