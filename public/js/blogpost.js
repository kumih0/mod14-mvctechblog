const newCommentHandler = async (event) => {
    event.preventDefault();
    const content = document.querySelector('#comment-content').value.trim();
    const blogpost_id = document.querySelector('#blogpost-id').value.trim();

    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content, blogpost_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/blogpost/${blogpost_id}`);
        }
        else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#comment-form').addEventListener('submit', newCommentHandler);