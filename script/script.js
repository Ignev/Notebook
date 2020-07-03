"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const noteText = document.querySelector(".main_textarea"),
          noteName = document.querySelector(".main_note-title"),
          btnSave  = document.querySelector(".main_btn"),
          list     = document.querySelector(".aside-right_list");
    let   notes,
          editing = false,
          curNum,
          curNote;
    if(notes = JSON.parse(localStorage.getItem('notes')) == null){
        notes = {};
    }
    else{
        notes = JSON.parse(localStorage.getItem('notes'));
    };
    const addList = (obj) => {
        for(let key in obj){
            const listItem   = document.createElement('li'),
                  buttonItem = document.createElement('button');
                  listItem.classList.add('list_item');
                  buttonItem.classList.add('list_button');
            buttonItem.innerHTML = buttonItem.dataset.num = key;
            listItem.appendChild(buttonItem);
            list.appendChild(listItem);
        }
    };
    addList(notes);
    const addZero = (num) => {
        if(num > 0 && num < 9){
            return "0" + num ;
        }
    }; //Добавление нуля к часам, минутам, секундам, если они > 9
    const recordSelection = () => {
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
    };
    const editNote = () => {
        notes[curNum].text = noteText.value;
        notes[curNum].name = noteName.value;
        notes[noteName.value] = notes[curNum];
        curNote.dataset.num = noteName.value;
        delete notes[curNum];
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
    };
    const deleteNote = () =>{
        list.addEventListener('contextmenu', event => {
            event.preventDefault();
            let num = event.target.dataset.num;
            if(event.target.classList.contains('list_button')){
                event.target.parentNode.remove();
            }
            delete notes[num];
            localStorage.clear();
            saveInLocalStorage(notes);
            
            noteText.value = " ";
            noteName.value = " ";
            editing = false;
        });
    };
    const addData = () => {
            let date = new Date,
            now = 
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds() + ' ' +
            addZero(date.getDate()) + '.' +
            addZero(date.getMonth() + 1) + '.' +
            date.getFullYear();
            notes[noteName.value] = {text: noteText.value, name: noteName.value, time: now};
            const listItem = document.createElement('li'),
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
    }; // Функия занесения записей в массив
    const trackingSave = () => {
        btnSave.addEventListener('click', () =>{
            if(editing){
                editNote();
                localStorage.clear();
                saveInLocalStorage(notes);
            }
            else{
                addData();
                localStorage.clear();
                saveInLocalStorage(notes);
            }
            editing = false;
            
        });
        document.addEventListener('keydown', event => {
            if(event.code == 'KeyS' && (event.ctrlKey || event.metaKey)){
                event.preventDefault();
                if(editing){
                    editNote();
                    localStorage.clear();
                    saveInLocalStorage(notes);
                    console.log(notes);
                    
                }
                else{
                    addData();
                    localStorage.clear();
                    saveInLocalStorage(notes);
                    console.log(notes);
                    
                }
                editing = false;
            }
        });
    }; // Сохранение записей
    const saveInLocalStorage = (obj) => {
        localStorage.setItem("notes", JSON.stringify(obj));
    };
    
    
    trackingSave();
    recordSelection();
    deleteNote();
    
});