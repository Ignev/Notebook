"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const noteText = document.querySelector(".main_textarea"),
          noteName = document.querySelector(".main_note-title"),
          btnSave  = document.querySelector(".main_btn"),
          list     = document.querySelector(".aside-right_list"),
          li       = document.querySelectorAll(".list_item");
    let notes = [];
    const addZero = (num) => {
        if(num > 0 && num < 9){
            return num + "0";
        }
    };
    const addData = () => {
        btnSave.addEventListener('click', () =>{
            let date = new Date;
            let now = 
                addZero(date.getHours()) + ':' +
                addZero(date.getMinutes()) + ':' +
                addZero(date.getSeconds()) + ' ' +
                addZero(date.getDate()) + '.' +
                addZero(date.getMonth() + 1) + '.' +
                date.getFullYear();
            notes.push({text: noteText.value, name: noteName.value, time: now});
            const listItem = document.createElement('li')
            listItem.innerHTML = noteName.value;
            listItem.classList.add('list_item');
            listItem.dataset.num = notes.length - 1;
            list.appendChild(listItem);
            noteText.value = " ";
            noteName.value = " ";
        });
        document.addEventListener('keydown', event => {
            if(event.code == 'KeyS' && (event.ctrlKey || event.metaKey)){
                let date = new Date;
            let now = 
                addZero(date.getHours()) + ':' +
                addZero(date.getMinutes()) + ':' +
                addZero(date.getSeconds()) + ' ' +
                addZero(date.getDate()) + '.' +
                addZero(date.getMonth() + 1) + '.' +
                date.getFullYear();
            notes.push({text: noteText.value, name: noteName.value, time: now});
            const listItem = document.createElement('li')
            listItem.innerHTML = noteName.value;
            listItem.classList.add('list_item');
            listItem.dataset.num = notes.length - 1;
            list.appendChild(listItem);
            noteText.value = " ";
            noteName.value = " ";
            }
        });
    };
    const editNote = () => {
        console.log(li);
        li.forEach(el => {
            el.addEventListener('click', ()=>{
                console.log(el);
                let num = this.dataset.num;
                noteText.value = notes[num].text;
                console.log(1);
            });
        });
    };
    addData();
    editNote();
});