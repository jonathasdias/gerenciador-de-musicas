import alertUpdate from './utilities/alertUpdate.js';
import music from './music.js';

const container_music = document.getElementById('container-music');
const search = document.getElementById('search');
const form_search = document.getElementById('form-search');
const playlist = document.getElementById('playlist');
let searchedSongs = [...music];

// Criado os cards.
function musicCard(song) {
    const article = document.createElement('article');
    article.className = 'w-60 bg-black text-green-600 rounded-lg';
    
    const figure = document.createElement('figure');
    figure.className = 'w-full h-36';

    const img = document.createElement('img');
    img.className = 'w-full h-full rounded-t-lg';
    img.src = song.songImg;
    img.alt = `Capa da música: ${song.songName} de ${song.singerName}`;

    const nameSong = document.createElement('h2');
    nameSong.className = 'px-2 mt-1 font-extrabold text-xl';
    nameSong.textContent = song.songName;
    
    const nameSinger = document.createElement('h3');
    nameSinger.classList.add('px-2');
    nameSinger.textContent = song.singerName;
    
    const container_btn = document.createElement('div');
    container_btn.classList.add('text-center', 'py-4');

    const btn = document.createElement('button');
    btn.className = 'rounded-full bg-green-600 text-white w-12 h-12';
    btn.title="Adicione a sua lista de musicas";
    btn.ariaLabel = "Adicionar a sua lista de musicas";
    btn.innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i>';
    btn.onclick = ()=> addToPlaylist(song);

    figure.appendChild(img);
    container_btn.appendChild(btn);
    article.appendChild(figure);
    article.appendChild(nameSong);
    article.appendChild(nameSinger);
    article.appendChild(container_btn);

    return article;
}

function songPlaylistCard(song) {
    const article = document.createElement('article');
    article.id = song.id;
    article.className = "bg-green-800 text-white flex justify-between p-2";
    
    const nameSong = document.createElement('p');
    nameSong.textContent = song.songName;
    
    const btn = document.createElement('button');
    btn.className = "text-red-600";
    btn.title = "Remover musica";
    btn.ariaLabel = "Remover musica";
    btn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    btn.onclick = ()=> removeFromPlaylist(song.id);

    article.appendChild(nameSong);
    article.appendChild(btn);

    return article;
}

// Adicionando lista de musicas na pagina e fazendo buscas das musicas.
function renderMusicCard() {

    container_music.innerHTML = '';

    if(searchedSongs.length === 0) {
        container_music.innerHTML = "<p class='text-4xl text-red-600'>Não encontramos essa música.</p>";
    }

    searchedSongs.forEach((song)=> {
        container_music.appendChild(musicCard(song));
    })

}

function searchMusic(e) {
    e.preventDefault();

    if(search.value === '') {
        renderMusicCard();
    }
    
    searchedSongs = music.filter(song=> song.songName.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()));
    renderMusicCard();
}

// Adicionando, removendo e renderizando as musicas na playlist.
function addToPlaylist(song) {
    const playlistStorage = JSON.parse(localStorage.getItem('playlist')) || [];

    const isSongInPlaylist = playlistStorage.some(itemSong => itemSong.id === song.id);

    if(!isSongInPlaylist) {
        playlistStorage.push(song)
        localStorage.setItem('playlist', JSON.stringify(playlistStorage));
        alertUpdate('Adicionado a playlist');
        renderPlaylist();
        return;
    }
    alertUpdate('Você ja tem essa musica na sua playlist');
}

function removeFromPlaylist(id) {
    const playlistStorage = JSON.parse(localStorage.getItem('playlist')) || [];

    const newPlaylistStorage = playlistStorage.filter(song=> song.id !== id);

    localStorage.setItem('playlist', JSON.stringify(newPlaylistStorage));

    renderPlaylist();
}

function renderPlaylist() {
    const playlistStorage = JSON.parse(localStorage.getItem('playlist')) || [];

    playlist.innerHTML = '';
    
    if(playlistStorage.length === 0) {
        playlist.innerHTML = '<p class="mx-auto text-white text-xl">Playlist vázia</p>';
    }

    playlistStorage.forEach((song)=> {
        playlist.appendChild(songPlaylistCard(song));
    })
}

// Incialização da página;
window.addEventListener('load', ()=> {
    renderMusicCard();
    renderPlaylist();
});

// evento de buscas das musicas.
form_search.addEventListener('submit', searchMusic);

// Variaveis usadas para abrir e fechar playList.
const container_playList = document.getElementById('container-playlist');
const btn_open_playList = document.getElementById('btn-open-playlist');
const btn_clear_playlist = document.getElementById('btn-clear-playlist');
const btn_page_player = document.getElementById('btn-page-player');

// Ir para a página player.html do tocador das músicas.
btn_page_player.addEventListener('click', ()=> {
    window.location.href = './player.html';
})

// Abrir e fechar a playList.
btn_open_playList.addEventListener('click', ()=> {
    
    container_playList.classList.remove('hidden');
    setTimeout(() => {
        btn_open_playList.ariaPressed = true;
        container_playList.classList.remove('top-[-100vh]');
        container_playList.classList.add('top-0');
    }, 1);
})

btn_clear_playlist.addEventListener('click', ()=> {
    
    container_playList.classList.remove('top-0');
    container_playList.classList.add('top-[-100vh]');
    btn_clear_playlist.ariaPressed = false;
    setTimeout(() => {
        container_playList.classList.add('hidden');
    }, 100);
})