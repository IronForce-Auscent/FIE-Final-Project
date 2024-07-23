function switchState(checkbox) {
    if (checkbox.classList.contains('bi-check-square')) {
        checkbox.classList.remove('bi-check-square');
        checkbox.classList.add('bi-square');
    } else if (checkbox.classList.contains('bi-square')) {
        checkbox.classList.remove('bi-square');
        checkbox.classList.add('bi-check-square');
    }
}

function clearAll() {
    var entries = document.getElementsByClassName('todo-entries');
    for (var i = 0; i < entries.length; i++) {
        entries[i].remove();
    }
}

function removeItem() {
    var entries = document.getElementsByClassName('todo-entry');
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var id = entry.id;
        console.log(entry + " " + id);
        if (entry.getElementsByTagName('i')[0].classList.contains('bi-check-square')) {
            console.log("Removed" + entry);
            entry.remove();
            $.post("/todo/remove", {
                "id": id
            });
            i--;
        }
    }
}