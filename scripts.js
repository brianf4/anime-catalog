import anime from './animeDB.js'


function showAnimeList() {
    const list = document.getElementById("animeList");

    for (let i = 0; i < anime.data.length; i++) {
        const listItem = document.createElement("li");
        listItem.innerHTML = 
        `
        <img class="animeImg" src=${anime.data[i].images.jpg.image_url} alt="">
        <div class="animeContent">
            <h2 class="animeTitle">${anime.data[i].title_english}</h2>
            <p class="animeDesc">${anime.data[i].synopsis}</p>
            <button id="${i}">Add to watch list!</button>
            <i>${anime.data[i].duration}</i>
        </div>
        `
        list.appendChild(listItem);
    }

}
showAnimeList();

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    push(val) {
        const newNode = new Node(val)

        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode
        }
        return this
    }

    traverse() {
        let curNode = this.head;
        const watchList = document.querySelector(".watch-list");

        while (curNode) {
            const listItem = document.createElement("li");
            listItem.innerHTML = curNode.val
            watchList.appendChild(listItem);
            listItem.addEventListener("click", removeFromWatchList);
            curNode = curNode.next;
        }
    }



}

let watchList = new SinglyLinkedList();

const buttons = document.querySelector("#animeList").querySelectorAll("button");

function addToWatchList(event) {
    // Get the id of the clicked button from the event target
    const buttonId = event.target.id;
    watchList.push(
        `
            <h3>${anime.data[buttonId].title}</h3>
            <p>${anime.data[buttonId].synopsis.split('.')[0] + '...'}</p>
            <span>${anime.data[buttonId].duration}</span>
        `)
    
    // I have to clear the li before I traverse through the list again
    const list = document.querySelector(".watch-list");

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    watchList.traverse();
    console.log("Added to watch list!");
}

buttons.forEach(button => {
    button.addEventListener('click', addToWatchList);
});


function removeFromWatchList(event) {
    event.target.remove();
}