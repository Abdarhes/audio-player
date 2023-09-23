const muusicPlayBtn = document.querySelector('.music__play')
const switchingFirst = document.querySelector('.switching__left');
const switchingSec = document.querySelector('.switvhing__right');
const audio = document.querySelector('.music__audio');
const musicProgressContainer = document.querySelector('.music__progress__container');
const progress = document.querySelector('.music__progress');
const titleSong = document.querySelector('.music__song');
const musicSing = document.querySelector('.music__singer');
const background = document.querySelector('.background__image');
const image = document.querySelector('.image');
const musicPlayer = document.querySelector('.music__player');
const current = document.querySelector('.music__current');
const duration = document.querySelector('.music__duration');
const mameSongs = ['We','Tuman','Mjortvyjj_Anarkhist'];
const nameSingers = ['Julia Bogatyreva', 'Seсtor gaza', 'Korol i SHut']

let songIndex = 0;

function inputSong(song){ 
    titleSong.innerHTML = mameSongs[songIndex];
    musicSing.innerHTML = nameSingers[songIndex]
audio.src = `audio/${song}.mp3`;
image.src= `images/img${songIndex + 1}.jpg`;
background.src= `images/bck${songIndex + 1}.jpg`;
}

function startSong(){
    musicPlayer.classList.add('btn-play');
    muusicPlayBtn.src = 'images/pause.png';
    audio.play();
}

function stopSong(){
    musicPlayer.classList.remove('btn-play');
    muusicPlayBtn.src = 'images/play.png';
    audio.pause();
}

muusicPlayBtn.addEventListener('click', () => {
    const isPlaying = musicPlayer.classList.contains('btn-play')
    if (isPlaying){
        stopSong()
    }
    else{
        startSong()
    }
})

function nextSong(){
songIndex++;
if(songIndex > 2){
    songIndex = 0;
}
inputSong(mameSongs[songIndex])
startSong()
}
switchingSec.addEventListener('click',nextSong)


function previousSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = 2
    }
    inputSong(mameSongs[songIndex])
startSong()
}
switchingFirst.addEventListener('click',previousSong)



function updateProgressSong(event){
const {duration,currentTime} = event.srcElement
const progressPercent = ( currentTime / duration) * 100;
progress.style.width = `${progressPercent}%`

}
audio.addEventListener('timeupdate',updateProgressSong)

function percentProgress(event){
const width = this.clientWidth
const clickX = event.offsetX
const duration = audio.duration
audio.currentTime = (clickX/width) * duration
}
musicProgressContainer.addEventListener('click',percentProgress)

function seektimeupdate(){
    if(audio.duration){
        let nt = audio.currentTime * (100 / audio.duration);
        musicProgressContainer.value = nt;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
        if(cursecs<10){cursecs = "0" + cursecs}
        if(dursecs<10){dursecs = "0" + dursecs}
        if(curmins<10){curmins = "0" + curmins}
        if(dursecs<10){dursecs = "0" + dursecs}
        current.innerHTML = curmins + ":"+cursecs;
        duration.innerHTML = durmins + ":" + dursecs;}
     else{
         current.innerHTML = "00"+":"+"00";
         duration.innerHTML = "00"+":"+"00";
     }   
    }
audio.addEventListener("timeupdate",function(){seektimeupdate()})