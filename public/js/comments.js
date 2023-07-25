// public/js/comments.js
document.querySelector('#new-comment-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-content-input').value.trim();
    const blogId = document.querySelector('#new-comment-form').dataset.blogId;

    if (content) {
        const response = await fetch('/comments', {
            method: 'POST',
            body: JSON.stringify({ content, blogId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
});

document.querySelectorAll('.delete-comment-btn').forEach((button) => {
    button.addEventListener('click', async (event) => {
        const response = await fetch(`/comments/${event.target.dataset.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to delete comment');
        }
    });
});
