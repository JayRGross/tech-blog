const updateButtonHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (event.target.hasAttribute('id')) {
        const id = event.target.getAttribute('id');
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
              },
        }) ;

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    };

};
const deleteButtonHandler = async (event) => {

    const id = event.target.getAttribute('id');

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    }) ;

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }
};

const createPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
              'Content-Type': 'application/json',
            },
        });
      
        if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert('Failed to create post');
        }
    }
    
};

const createPostButtonHandler = () => {
    document.location.replace('/post-create')   
};

const postHandler = (event) => {
    const id = event.target.getAttribute('id');
    document.location.replace(`/post/${id}`); 
}

const createPost = document.querySelector('#create-post');
if (createPost) {
    createPost.addEventListener('click', createPostButtonHandler);
};

const posts = document.querySelector('.posts');
if (posts) {
    posts.addEventListener('click', postHandler);
};

const post = document.querySelector('.create-post');
if (post) {
    post.addEventListener('submit', createPostFormHandler);
};

const updatePost = document.querySelector('.update-post');
if (updatePost) {
    updatePost.addEventListener('click', updateButtonHandler);
};

const deletePost = document.querySelector('.delete-post');
if (deletePost) {
    deletePost.addEventListener('click', deleteButtonHandler);
};