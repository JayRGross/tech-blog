const showComment = (e) => {
    if(e.target.name === 'comment') {
        e.target.remove();
        const form = document.createElement('form');
        form.classList.add('mt-5', 'comment-form');
    
        const label = document.createElement('label');
        const labelText = document.createTextNode('Comment');
        label.classList.add('form-label');
        label.setAttribute('for', 'comment');
        label.appendChild(labelText);
    
        const textArea = document.createElement('textarea');
        textArea.setAttribute('name', 'comment-area');
        textArea.setAttribute('id', e.target.id);
        textArea.setAttribute('cols', '100');
        textArea.setAttribute('rows', '5');
    
        const button = document.createElement('button');
        button.setAttribute('type', 'submit');
        button.classList.add('btn', 'btn-secondary');
        const buttonText = document.createTextNode('Submit');
        button.appendChild(buttonText);
    
        form.appendChild(label);
        form.appendChild(textArea);
        form.appendChild(button);

        const cardElement = document.getElementById(e.target.id);
        cardElement.appendChild(form);
    
        document
        .querySelector('.comment-form')
        .addEventListener('submit', submitComment);
    }
    
};

const submitComment =  async (e) => {
    e.preventDefault();
    const text = document.querySelector('textarea[name="comment-area"]').value;
    const post_id = parseInt(document.querySelector('textarea').id);

    if (text) {
        const response = await fetch(`/api/users/comment`, {
            method: 'POST',
            body: JSON.stringify({ text, post_id }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document.getElementById('posts').addEventListener('click', showComment);