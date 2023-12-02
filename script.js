const list = document.querySelector('#list ul');

const listOut = () => {
    let keys = Object.keys(localStorage);

    let todoList = [];
    keys.forEach(key => {
        if (key.substring(0, 6) == 'hjtodo') {
            todoList.push(key.slice(7));
        }
    })

    todoList.sort();
    while (list.firstChild) {
        list.removeChild(list.lastChild);
    }
    todoList.forEach(todo => addToDo(todo));
}

listOut();

document.addEventListener('click', () => {
    list.childNodes.forEach(child => {
        if (child.className == 'editing' && document.activeElement.parentElement !== child) {
            exitEdit(child);
        }
    })
});

document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        if (document.activeElement.parentElement.className == 'editing') {
            acceptEdit(document.activeElement.parentElement);
        }
    }
})

list.addEventListener('click', e => {
    let li = null;

    if (e.target.className == 'delete') {
        li = e.target.parentElement;
        deleteToDo(li);
    }
    else if (e.target.className == 'delete-ico') {
        li = e.target.parentElement.parentElement;
        deleteToDo(li);
    }
    else if (e.target.className == 'edit') {
        li = e.target.parentElement;
        editToDo(li);
    }
    else if (e.target.className == 'edit-ico') {
        li = e.target.parentElement.parentElement;
        editToDo(li);
    }
    else if (e.target.className == 'cancel') {
        li = e.target.parentElement;
        exitEdit(li)
    }
    else if (e.target.className == 'cancel-ico') {
        li = e.target.parentElement.parentElement;
        exitEdit(li)
    }
    else if (e.target.className == 'done') {
        li = e.target.parentElement;
        acceptEdit(li)
    }
    else if (e.target.className == 'done-ico') {
        li = e.target.parentElement.parentElement;
        acceptEdit(li)
    }
});

const add = document.forms['add-todo'];
add.addEventListener('submit', e => {
    e.preventDefault();
    const newToDo = add.querySelector('input[type="text"]').value;
    add.querySelector('input[type="text"]').value = "";
    if (newToDo) localStorage.setItem(`hjtodo.${capitalizeFirstLetter(newToDo.trim())}`, 1);
    listOut();
});

const deleteToDo = li => {
    list.removeChild(li);
    localStorage.removeItem(`hjtodo.${li.firstChild.textContent}`);
    listOut();
}

function addToDo(newToDo) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const deleteImg = document.createElement('img');
    const editImg = document.createElement('img');

    deleteImg.classList.add('delete-ico');
    deleteImg.setAttribute('src', "icons/trash.png");
    deleteBtn.classList.add('delete');
    deleteBtn.appendChild(deleteImg);

    editImg.classList.add('edit-ico');
    editImg.setAttribute('src', "icons/pencil-line.png")
    editBtn.classList.add('edit');
    editBtn.appendChild(editImg);

    span.textContent = `${newToDo}`;
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
}

const editToDo = li => {
    let oldText = li.firstElementChild.textContent;
    while (li.firstChild) {
        li.removeChild(li.lastChild);
    }
    li.className = 'editing';

    const span = document.createElement('span');
    const input = document.createElement('textarea');
    const cancelBtn = document.createElement('button');
    const doneBtn = document.createElement('button');
    const cancelImg = document.createElement('img');
    const doneImg = document.createElement('img');

    span.textContent = oldText;
    span.style.display = 'none';

    input.textContent = oldText;
    input.style.resize = 'none';

    cancelImg.classList.add('cancel-ico');
    cancelImg.setAttribute('src', "icons/cancel.png");
    cancelBtn.classList.add('cancel');
    cancelBtn.appendChild(cancelImg);

    doneImg.classList.add('done-ico');
    doneImg.setAttribute('src', "icons/check.png")
    doneBtn.classList.add('done');
    doneBtn.appendChild(doneImg);

    li.append(span);
    li.appendChild(input);
    li.appendChild(doneBtn);
    li.appendChild(cancelBtn);

    input.focus();
}

const exitEdit = li => {
    list.removeChild(li);
    listOut();
}

const acceptEdit = li => {
    let newText = li.childNodes[1].value;
    localStorage.setItem(`hjtodo.${capitalizeFirstLetter(newText.trim())}`, 1)
    localStorage.removeItem(`hjtodo.${li.firstChild.textContent}`);
    li.firstChild.textContent = newText;
    listOut();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}