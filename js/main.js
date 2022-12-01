let arWords = Array.from(document.querySelectorAll('#arWord'));
let wordsContainer = document.querySelector('.words .container');
let wordsDiv = document.querySelector('.words');
let deleteAllBtn = document.getElementById('deleteAllBtn');

let words;

if (localStorage.words != null)
{
    words = JSON.parse(localStorage.words);
}
else
{
    words = [];
}

arWords.forEach(i => {
    if (i.innerHTML == ''){
        i.style.display = 'none';
    }
});

let enInput = document.getElementById('en');
let arInput = document.getElementById('ar');


deleteAllBtn.onclick = function deleteAll()
{
    localStorage.clear();
    words.splice(0);
    showWords();
}

function addNewWord()
{
    if (!enInput.value == '')
    {
        let newWord = {
            en:enInput.value,
            ar:arInput.value
        }
        words.push(newWord);
        localStorage.setItem('words', JSON.stringify(words));
        enInput.value = '';
        arInput.value = '';
    }
    else {
        alert('The EN-WORD Field is Empty!');
    }
    showWords();
}


function showWords() {
        wordsContainer.innerHTML = '';
        if (!words.length == 0)
        {
            words.forEach(i => {
            let word = document.createElement('div');
            word.className = 'word';
            let wordEn = document.createElement('div');
            wordEn.className = 'en-word';
            wordEn.innerHTML = i.en;
            word.appendChild(wordEn);
            wordsContainer.appendChild(word);
            if (!i.ar == '')
            {
                let wordAr = document.createElement('div');
                wordAr.className = 'ar-word';
                wordAr.id = 'arWord';
                let wordArText = document.createElement('p');
                wordAr.appendChild(wordArText);
                wordArText.innerHTML = i.ar;
                word.appendChild(wordAr);
            }
            let deletebtn = document.createElement('span');
            deletebtn.innerHTML = 'Delete';
            deletebtn.onclick = function deleteWord()
            {
                words.splice(i,1);
                localStorage.words = JSON.stringify(words);
                showWords();
            }
            word.appendChild(deletebtn);
        });
        }
        else {
            let empty = document.createElement('h1');
            empty.innerHTML = 'You didn\'t add any words yet, Try to add a word!';
            wordsContainer.appendChild(empty);
        }
        
        if (words.length == 0)
        {
            deleteAllBtn.style.display = 'none';
        }
        else
        {
            deleteAllBtn.style.display = 'block';
        }
}

showWords();