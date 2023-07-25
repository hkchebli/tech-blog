// public/js/dashboard.js
document.querySelector('#new-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title-input').value.trim();
    const content = document.querySelector('#post-content-input').value.trim();

    if (title && content) {
        const response = await fetch('/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create post');
        }
    }
});

document.querySelectorAll('.delete-post-btn').forEach((button) => {
    button.addEventListener('click', async (event) => {
        const response = await fetch(`/blogs/${event.target.dataset.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to delete post');
        }
    });
});
