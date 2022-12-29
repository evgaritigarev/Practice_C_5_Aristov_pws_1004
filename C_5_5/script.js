const chat = document.querySelector(".chat_window");
const servMess = document.querySelector(".server_message");
const userMess = document.querySelector(".user_message");
const inputOne = document.querySelector(".input_one");
const inputTwo = document.querySelector(".input_two");
const btnSend = document.querySelector(".btn_send_message");

window.addEventListener('DOMContentLoaded', () => {
    const saveNum1 = localStorage.getItem('num1Storage');
    const saveNum2 = localStorage.getItem('num2Storage');
    if (saveNum1 != null && saveNum2 != null) {
        useRequest(`https://picsum.photos/v2/list?page=${saveNum1}&limit=${saveNum2}`, displayResult);
        chat.innerHTML += '<div class="display_message server_message"><p>' + saveNum1 + saveNum2 + '</p></div>'
    }
});

function useRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.status != 200) {
            chat.innerHTML += '<div class="display_message server_message"><p>' + xhr.status + '</p></div>'
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    };
    xhr.onerror = function() {
        chat.innerHTML += '<div class="display_message server_message"><p>' + xhr.status + '</p></div>'
    };
    xhr.send();
}

function displayResult(apiData) {
    let cards = '';
    apiData.forEach(item => {
        const cardBlock = `
            <div class="display_message server_message">
                <img src="${item.download_url}" class="card_image"/>
                <p>${item.author}</p>
            </div>
        `;
        cards = cards + cardBlock;
    });
    chat.innerHTML = cards;
}

async function chekNum() {
    const num1 = Number(inputOne.value);
    const num2 = Number(inputTwo.value);
    if ((num1 < 1 || num1 > 10 || isNaN(num1)) && (num2 < 1 || num2 > 10 || isNaN(num2))) {
        chat.innerHTML += '<div class="display_message user_message"><p>Номер страницы и лимит вне диапазона от 1 до 10</p></div>'
    } else if (num1 < 1 || num1 > 10 || isNaN(num1)) {
        chat.innerHTML += '<div class="display_message user_message"><p>Номер страницы вне диапазона от 1 до 10</p></div>'
    } else if (num2 < 1 || num2 > 10 || isNaN(num2)) {
        chat.innerHTML += '<div class="display_message user_message"><p>Лимит вне диапазона от 1 до 10</p></div>'
    } else if ((num1 >= 1 && num1 <= 10) && (num2 >= 1 && num2 <= 10)) {
        await useRequest(`https://picsum.photos/v2/list?page=${num1}&limit=${num2}`, displayResult);
        localStorage['num1Storage'] = num1;
        localStorage['num2Storage'] = num2;
    }
    inputOne.value = '';
    inputTwo.value = '';
}

btnSend.addEventListener('click', chekNum);