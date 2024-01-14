import shuffleArray from "./utilities/shuffleArray.js";
import formatSeconds from "./utilities/formatSeconds.js";

const player = document.getElementById('player');
const main = document.getElementById('main');

const btn_play = document.getElementById('btn-play');
const btn_next = document.getElementById('btn-next');
const btn_prev = document.getElementById('btn-prev');
const btn_shuffle = document.getElementById('btn-shuffle');
const btn_repet = document.getElementById('btn-repet');

const name_song = document.getElementById('name-song');
const name_singer = document.getElementById('name-singer');
const img_player = document.getElementById('img-player');
const audio = document.getElementById('audio');

const current_time_song = document.getElementById('current-time');
const duration_total = document.getElementById('duration-total');

const containe_progress_song = document.getElementById('container-progress-song');
const progress_song = document.getElementById('progress-song');

const playlistStorage = JSON.parse(localStorage.getItem('playlist')) || [];
let shuffledSongList = [...playlistStorage];

let currentSong = 0;
let isPlaySong = false;
let isShuffled = false;
let isRepetSong = false;

// carregando o player na página.
function loadPlayer() {
    if(shuffledSongList.length < 1) {
        player.classList.add('hidden');
        main.innerHTML = '<p class="text-3xl">Sua playlist esta vázia</p>';
        return;
    }

    player.classList.remove('hidden');
    img_player.src = shuffledSongList[currentSong].songImg;
    name_song.innerHTML = shuffledSongList[currentSong].songName;
    name_singer.innerHTML = shuffledSongList[currentSong].singerName;
    audio.src = shuffledSongList[currentSong].song;
}

// Funcionalidades de ir e voltar musicas.
function prevSong() {

    if(currentSong > 0) {
        currentSong--;
        loadPlayer();
        playSong();
        return;
    }
    
}

function nextSong() {
    const size = shuffledSongList.length - 1;
    
    if(currentSong < size) {
        currentSong++;
        loadPlayer();
        playSong();
        return;
    }

}

// Funcionalidades de pausar e iniciar a musica.
function playSong() {
    audio.play();
    btn_play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaySong = true;
}

function pauseSong() {
    audio.pause();
    btn_play.innerHTML = '<i class="fa-solid fa-play"></i>';
    isPlaySong = false;
}

function playPauseSong() {
    if(isPlaySong) {
        pauseSong();
    }else {
        playSong();
    }
}

// Atualizando o progresso da musica
function updateProgressSong() {

    let widthTime = (audio.currentTime / audio.duration) * 100;
    progress_song.style.setProperty('width', widthTime + '%');
    current_time_song.innerHTML = formatSeconds(audio.currentTime);

}

// Mostrando a duração total da musica.
function updateDurationTotal() {
    duration_total.innerHTML = formatSeconds(audio.duration);
}

// Checando se a playlist estar embaralhada ou não.
function checkIsShuffled() {
    if(!isShuffled) {
        shuffleArray(shuffledSongList);
        btn_shuffle.classList.add('text-green-600');
        isShuffled = true;
    }else {
        shuffledSongList = [...playlistStorage];
        btn_shuffle.classList.remove('text-green-600');
        isShuffled = false;
    }
}

// Checando se a musica vai se repetir ou não.
function checkIsRepeat() {
    if(!isRepetSong) {
        btn_repet.classList.add('text-green-600');
        isRepetSong = true;
    }else {
        btn_repet.classList.remove('text-green-600');
        isRepetSong = false;
    }
}

function nextOrRepetSong() {
    if(!isRepetSong) {
        pauseSong();
        nextSong();
    }else {
        playSong();
    }
}

// Funcionalidade de colocar no tempo da musica com clique.
function jumpTo(e) {
    let width_container_progress = containe_progress_song.clientWidth;
    let click_position = e.offsetX;
    let junpToTime = (click_position / width_container_progress) * audio.duration;
    audio.currentTime = junpToTime;
}

// eventos.
window.addEventListener('load', loadPlayer);
btn_play.addEventListener('click', playPauseSong);
btn_next.addEventListener('click', nextSong);
btn_prev.addEventListener('click', prevSong);
containe_progress_song.addEventListener('click', jumpTo);
audio.addEventListener('timeupdate', updateProgressSong); 
audio.addEventListener('ended', nextOrRepetSong);
audio.addEventListener('loadedmetadata', updateDurationTotal);
btn_shuffle.addEventListener('click', checkIsShuffled);
btn_repet.addEventListener('click', checkIsRepeat);