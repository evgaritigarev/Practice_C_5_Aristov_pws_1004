const chat = document.querySelector(".chat_window");
const servMess = document.querySelector(".server_message");
const userMess = document.querySelector(".user_message");
const inputOne = document.querySelector(".input_one");
const inputTwo = document.querySelector(".input_two");
const btnSend = document.querySelector(".btn_send_message");
const myImage = document.querySelector(".my-image");


const useRequest = (url) => {
    return fetch(url)
        .then((response) => {
            return response.blob();
        })
        .then((myBlob) => {
            const objectURL = URL.createObjectURL(myBlob);
            myImage.src = objectURL;
        })
}

async function chekNum() {
    const num1 = Number(inputOne.value);
    const num2 = Number(inputTwo.value);
    if ((num1 < 100 || num1 > 300) && (num2 < 100 || num2 >300)) {
        chat.innerHTML += '<div class="display_message user_message"><p>Одно из чисел вне диапазона от 100 до 300</p></div>'
    } else if ((num1 >= 100 && num1 <= 300) && (num2 >= 100 && num2 <= 300)) {
        await useRequest(`https://picsum.photos/${num1}/${num2}`);
    } else {
        chat.innerHTML += '<div class="display_message server_message"><p>Введите число</p></div>'
    }
    inputOne.value = '';
    inputTwo.value = '';
}

btnSend.addEventListener('click', chekNum);