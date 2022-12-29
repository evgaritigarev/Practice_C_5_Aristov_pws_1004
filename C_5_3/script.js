const chat = document.querySelector(".chat_window");
const servMess = document.querySelector(".server_message");
const userMess = document.querySelector(".user_message");
const input = document.querySelector(".input_text");
const btnSend = document.querySelector(".btn_send_message");

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

function chekNum() {
    const num = Number(input.value);
    if (num < 1 || num > 10) {
        chat.innerHTML += '<div class="display_message user_message"><p>число вне диапазона от 1 до 10</p></div>'
    } else if (num >= 1 && num <= 10) {
        useRequest(`https://picsum.photos/v2/list?limit=${num}`, displayResult);
    } else {
        chat.innerHTML += '<div class="display_message server_message"><p>Введите число</p></div>'
    }
    input.value = '';
    return num;
}

btnSend.addEventListener('click', chekNum);