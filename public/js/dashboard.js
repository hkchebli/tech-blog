document.addEventListener("DOMContentLoaded", function() {
    // Handling the submission of new posts
    const postForm = document.querySelector('#new-post-form');
    if (postForm) {
        postForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const title = document.querySelector('#blog-title-input').value.trim();
            const content = document.querySelector('#blog-content-input').value.trim();

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
    } else {
        console.error('Cannot find #new-post-form element.');
    }

    // Handling the deletion of posts
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
});
