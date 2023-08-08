const newCommentHandler = async (event) => {
    event.preventDefault();
    const content = document.querySelector('#comment-content').value.trim();
    const blogpost_id = document.getAttribute('data-blogpostId').value.trim();

    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content, blogpost_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.reload();
        }
        else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#comment-btn').addEventListener('click', newCommentHandler);