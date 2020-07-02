"use strict";

window.addEventListener("DOMContentLoaded", () => {
    
    let notes = {},
        editing = false,
        curNum,
        curNote;
    const noteText = document.querySelector(".main_textarea"),
          noteName = document.querySelector(".main_note-title"),
          btnSave  = document.querySelector(".main_btn"),
          list     = document.querySelector(".aside-right_list"),
    addZero = (num) => {
        if(num > 0 && num < 9){
            return "0" + num ;
        }
    }, //Добавление нуля к часам, минутам, секундам, если они > 9
    recordSelection = () => {
        list.addEventListener('click', event => {
            let num = event.target.dataset.num;
            if(event.target.classList.contains('list_button')){
                event.target.classList.add("action");
            }   
            noteText.value = notes[num].text;
            noteName.value = notes[num].name;
            curNum = num;
            curNote = event.target;
            editing = true;
        });
    },
    editNote = () => {
        notes[curNum].text = noteText.value;
        notes[curNum].name = noteName.value;
        if(noteName.value === " "){
            curNote.innerHTML = "No name";
        }
        else{
            curNote.innerHTML = noteName.value;
        }
        noteText.value = " ";
        noteName.value = " ";
        curNote.classList.remove('action');
        curNum = '';
        curNote = '';
    },
    deleteNote = () =>{
        list.addEventListener('contextmenu', event => {
            event.preventDefault();
            let num = event.target.dataset.num;
            delete notes[num];
            event.target.parentNode.remove();
            noteText.value = " ";
            noteName.value = " ";
            editing = false;
        });
    },
    addData = () => {
            let date = new Date,
            now = 
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds() + ' ' +
            addZero(date.getDate()) + '.' +
            addZero(date.getMonth() + 1) + '.' +
            date.getFullYear();
            notes[noteName.value] = {text: noteText.value, name: noteName.value, time: now};
            const listItem   = document.createElement('li'),
                buttonItem = document.createElement('button');
            if(noteName.value === " "){
                buttonItem.innerHTML = "No name";
            }
            else{
                buttonItem.innerHTML = noteName.value;
            }
            buttonItem.classList.add('list_button');
            buttonItem.dataset.num = noteName.value;
            listItem.appendChild(buttonItem);
            listItem.classList.add('list_item');
            list.appendChild(listItem);
            noteText.value = " ";
            noteName.value = " ";
    }, // Функия занесения записей в массив
    trackingSave = () => {
        btnSave.addEventListener('click', () =>{
            if(editing){
                editNote()
            }
            else{
                addData();
            }
            editing = false;
        });
        document.addEventListener('keydown', event => {
            if(event.code == 'KeyS' && (event.ctrlKey || event.metaKey)){
                event.preventDefault();
                if(editing){
                    editNote();
                }
                else{
                    addData();
                }
                editing = false;
            }
        });
    }; // Сохранение записей
    trackingSave();
    recordSelection();
    deleteNote();
});