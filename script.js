const list = document.querySelector('#list ul');

list.addEventListener('click', e => {
    let li = null;
    if (e.target.className == 'delete') {
        li = e.target.parentElement;
    }
    else if (e.target.className == 'delete-ico') {
        li = e.target.parentElement.parentElement;
    }
    else{
        return;
    }
    list.removeChild(li);
})