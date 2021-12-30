const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.getElementById('post-name').value.trim();
  const body = document.getElementById('post-desc').value.trim();

  if (name && body) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ name, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

document.getElementById('create').addEventListener('click', newFormHandler);

document.getElementById('delete-btn').addEventListener('click', delButtonHandler);
