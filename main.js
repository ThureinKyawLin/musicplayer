import "./style.scss";
import * as bootstrap from "bootstrap"

const playListContainer = document.querySelector(".playListContainer");
const audioTag = document.querySelector('.audioTag');
const playedAndTotalTime = document.querySelector('.playedAndTotalTime');
const currentProgress = document.getElementById('currentProgress');
const playBtn = document.querySelector('.playBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const previousBtn = document.querySelector('.previousBtn');
const nextBtn = document.querySelector('.nextBtn');
const songsList = document.querySelector('.songs-list');
const playImgContainer = document.querySelector('.play-Img-Container');
const title = document.querySelector('.title');
const pauseImgSize = document.querySelector('.pauseImgSize');
const btnForShowList = document.querySelector('.btnForShowList');
const imgToRight = document.querySelector('.imgToRight');
const btnRmList = document.querySelector('.btnRmList')


let songs = [
    {id : 1 , trackSrc : './public/Idiots - တခန်းရပ်.mp3' , trackName : 'Idiots - တခန်းရပ်'},
    {id : 2 , trackSrc : './public/Idiots - နေရစ်ခဲ့တော့.mp3' , trackName : 'Idiots - နေရစ်ခဲ့တော့'},
    {id : 3 , trackSrc : './public/Idiots - ဘာလိုနေသေးလဲ.mp3' , trackName : 'Idiots - ဘာလိုနေသေးလဲ'},
    {id : 4 , trackSrc : './public/Idiots - မင်းလေး.mp3' , trackName : 'Idiots - မင်းလေး'},
    {id : 5 , trackSrc : './public/Idiots - အိပ်ယာဝင်တေး.mp3' , trackName : 'Idiots - အိပ်ယာဝင်တေး'},
    {id : 6 , trackSrc : './public/လေးဖြူ - အလွမ်းများ.mp3' , trackName : 'လေးဖြူ - အလွမ်းများ'},

   
]

let index = 0
let currentTrackId = 0;
let SongTitle = ""


const minSecChanger = (totalTime) => {
    const min = Math.floor(totalTime / 60);
    const sec = totalTime % 60;
    

    const minText = min < 10 ? "0" + min.toString() : min
    const secText = sec < 10 ? "0" + sec.toString() : sec
    return minText +" : "+ secText
}


songs.map(({id,trackName,trackSrc}) => {
    

    const trackTag = document.createElement('div');
    
    trackTag.addEventListener('click',() => {
        isPlaying = false;
        audioTag.src = trackSrc;  
        audioTag.play();
        btnForShowList.classList.add('d-none');
        btnRmList.classList.replace('d-none','d-block')
        
        setTimeout(() => {
            
            playImgContainer.classList.replace('d-none','d-block')
            playImgContainer.classList.replace('imgToLeft','imgToRight')
            songsList.classList.add('d-none');
        },500)
        title.innerText = trackName
        
        pauseAndPlay();
        isPlaying = true;

        index = songs.findIndex(obj=> {
            
            return (obj.id == id)
            
        })
        
        
        
    })

    trackTag.classList.add( 'm-1' , 'd-flex' ,'justify-content-center' , 'pe-none' , 'list' , 'user-select-none');
    trackTag.innerHTML = `
        <li class="list-group list-group-item trackWidth rounded-2 pe-auto" id="${id}"> <span> ${id} . </span> ${trackName}</li>
    `
    playListContainer.append(trackTag)


    
})





let durationText = "00:00"
let playTimeText = "00:00"
let duration = 0;
let playedTime = 0;
audioTag.addEventListener('loadeddata', () => {
    duration = Math.floor(audioTag.duration);
    durationText = minSecChanger(duration)
})

audioTag.addEventListener('timeupdate', () => {
    playedTime = Math.floor(audioTag.currentTime);
    playTimeText = minSecChanger(playedTime)
    const durationTextAndPlayedTime = playTimeText + " / " + durationText
    playedAndTotalTime.innerText = durationTextAndPlayedTime;

    currentProcressBar(playedTime);
    
})

const currentProcressBar = (playedTime) => {
    const cal = ( 350 / duration ) * playedTime;
    currentProgress.style.width = cal.toString() + "px"
}



// btn.......

let isPlaying = false;
playBtn.addEventListener('click', () => {
    
    const currentTime = Math.floor(audioTag.currentTime);
   
    if(currentTime == 0) {
        const songId = songs[0].trackSrc;
        audioTag.src = songId  
        audioTag.play();
        pauseAndPlay()
        
    } else {
        audioTag.play();
        pauseAndPlay()
    }

     isPlaying = true;
})

pauseBtn.addEventListener('click' , () => {
    audioTag.pause();
    pauseAndPlay();
    isPlaying = false;
})

const pauseAndPlay = () => {
    if(isPlaying == false) {
        pauseBtn.style.display = "inline-block" ;
        playBtn.style.display = "none";
        pauseImgSize.classList.remove("pauseImgSize")
 
    } else {
        playBtn.style.display = "inline-block";
        pauseBtn.style.display = "none" ;
        pauseImgSize.classList.add ("pauseImgSize")
        
    }
}


const nextProcess = () => {
    
  let nextSong = songs[index].trackSrc;
  currentTrackId = songs[index].id;
  audioTag.src = nextSong;
  audioTag.play();
}



nextBtn.addEventListener('click', () => {
    title.innerText = songs[index].trackName
    if( index === 0 || index == songs.length) {
        index ++;
        isPlaying = false
        pauseAndPlay()
        nextProcess()
        title.innerText = songs[index].trackName
        isPlaying = true  
    } 
  
    else if (index == songs.length-1){
        isPlaying = false
        nextProcess()
        pauseAndPlay()
        isPlaying = true
    
    }

    else if (index < songs.length ){
        isPlaying = false;
        pauseAndPlay()
        nextProcess()
        index ++;
        title.innerText = songs[index].trackName
        isPlaying = true
        
    }
        
        

})


previousBtn.addEventListener('click', () => {
    if (index ==  0) {
        return
    } else {
        isPlaying = false
        index --;
        let preSong = songs[index].trackSrc;
        audioTag.src = preSong;
        audioTag.play()
        pauseAndPlay()
        isPlaying = true
        
        

    }
    title.innerText = songs[index].trackName
    


})

const showHideFun = () =>{

    if(songsList.classList.contains('songsListToleft')) { 
        songsList.classList.replace('songsListToleft','songsListToRight');
        title.innerText = songs[index].trackName
        
        setTimeout(() => {
            songsList.classList.add('d-none')
            
            playImgContainer.classList.replace('d-none','d-block')
            playImgContainer.classList.replace('imgToLeft','imgToRight')

        },500)
        } else {
            setTimeout(() => {
                
                playImgContainer.classList.replace('imgToRight','imgToLeft')
                playImgContainer.classList.replace('d-block','d-none')
                songsList.classList.replace('d-none','d-block')
                songsList.classList.replace('songsListToRight','songsListToleft');
        
            },300)

        }

}


btnForShowList.addEventListener('click', () => {
    btnForShowList.classList.add('d-none')
    btnRmList.classList.replace('d-none','d-block')
    
       
    showHideFun()

   

   
})



btnRmList.addEventListener('click', ()  => {
    btnForShowList.classList.replace('d-none','d-block');
    btnRmList.classList.replace('d-block','d-none');

    btnRmList.classList.replace('d-block','d-none');
    playImgContainer.classList.replace('imgToRight','imgToLeft');
    playImgContainer.classList.replace('d-block','d-none');
    songsList.classList.replace('d-none','d-block')
    songsList.classList.replace('songsListToleft','songsListToRight')

    showHideFun()

})









