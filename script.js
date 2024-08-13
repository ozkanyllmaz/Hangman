const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const popup2 = document.getElementById('popup-container2');
const message_el = document.getElementById('succes-message');
const failMessage_el = document.getElementById('fail-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const warningMessage = document.getElementById('message');
const PlayAgainBtn = document.getElementById('play-again');
const PlayAgainBtn2 = document.getElementById('play-again2');


const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord (){
    const words = ['javascript','html','python','java'];
    return words[Math.floor(Math.random() * words.length)];
}


function displayWord() {
    
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ' '}
            </div>
        `).join('')}
    `;

    const w = word_el.innerText.replace(/\n/g,'');

    if (w === selectedWord){
        popup.style.display = 'flex';
        message_el.innerText = 'Tebrikler kazandınız';
        
    }
}

function updateWrongLetters(){
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatalı harfler</h3>': ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    items.forEach((item,index) => {
        const errorCount = wrongLetters.length;

        if(index < errorCount){
             item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }

        if(errorCount === items.length){
            popup2.style.display = 'flex';
            failMessage_el.innerText = 'Kaybettiniz';
        }

    })

}


function displayMessage(){
    warningMessage.classList.add('show');

    setTimeout(function(){
        warningMessage.classList.remove('show');
    },2000)
}

PlayAgainBtn.addEventListener('click',function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    updateWrongLetters();

    displayWord();

    popup.style.display = 'none';
});

PlayAgainBtn2.addEventListener('click',function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    updateWrongLetters();

    displayWord();

    popup2.style.display = 'none';

})



window.addEventListener('keydown', function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90 || e.key === 'i'){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage();
                
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                displayMessage();
                
            }
        }
    }
    
})


displayWord();


