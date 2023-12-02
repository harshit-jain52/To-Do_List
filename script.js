// Delete a To-Do

const list = document.querySelector('#list ul');
list.addEventListener('click', e => {
    let li = null;
    if (e.target.className == 'delete') {
        li = e.target.parentElement;
    }
    else if (e.target.className == 'delete-ico') {
        li = e.target.parentElement.parentElement;
    }
    else {
        return;
    }
    list.removeChild(li);
})

// Add a To-Do
const add = document.forms['add-todo'];
add.addEventListener('submit', e => {
    e.preventDefault();
    const newToDo = add.querySelector('input[type="text"]').value;
    console.log(newToDo);

    const list = document.querySelector('#list ul');
    let html = `<li> <span>${newToDo}</span> <button class='delete'><img class='delete-ico' src="icons/trash.png"></button></li>`
    list.innerHTML += html;
    /*const li = document.createElement('li');
    const span = document.createElement('span');
    const btn = document.createElement('button');
    const img = document.createElement('img');
    img.classList.add('delete-ico');
    img.setAttribute('src',"icons/trash.png");
    btn.classList.add('delete');
    btn.appendChild(img);
    span.textContent = `${newToDo}`;
    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);*/
})