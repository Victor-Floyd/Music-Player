const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

const songDataBase = [
  {
    songSrc: "./music/Water.mp3",
    title: "Water",
    artist: "Tyla",
    imgSrc: "./img/waterpng.png",
  },
  {
    songSrc: "./music/Nose Dive.mp3",
    title: "Nose Dive",
    artist: "Chris Brown",
    imgSrc: "./img/NoseDive.png",
  },
  {
    songSrc: "./music/Put In Work.mp3",
    title: "Put In Work",
    artist: "Jaquees Ft. Chris Brown",
    imgSrc: "./img/putInWork.png",
  },
  {
    songSrc: "./music/Ratchet Happy Birthday.mp3",
    title: "Ratchet Happy Birthday",
    artist: "Drake",
    imgSrc: "./img/RatchetHappyBirthday.png",
  },
  {
    songSrc: "./music/Session 32.mp3",
    title: "Session 32",
    artist: "Summer Walker",
    imgSrc: "./img/session32.png",
  },
  {
    songSrc: "./music/Transform.mp3",
    title: "Transform",
    artist: "Daniel Ceaser",
    imgSrc: "./img/Transform.png",
  },
  {
    songSrc: "./music/What You Won't Do for Love.mp3",
    title: "What You Won't Do For Love",
    artist: "Bobby Caldwell",
    imgSrc: "./img/Do For Love.png",
  },
  {
    songSrc: "./music/Vibe Out.mp3",
    title: "Vibe Out",
    artist: "Tems",
    imgSrc: "./img/Vibe Out.png",
  },
  {
    songSrc: "./music/WY@.mp3",
    title: "WY@",
    artist: "Brent Faiyaz",
    imgSrc: "./img/wy@.png",
  },
  {
    songSrc: "./music/All For You.mp3",
    title: "All For You",
    artist: "Blues Traveler",
    imgSrc: "./img/hardToSay.png",
  },
];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  loadMusic(index++);
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    loadMusic(index++);
    play();
  } else {
    pause();
  }
});
previousButton.addEventListener("click", () => {
  if (index > 0) {
    loadMusic(index--);
    play();
  } else {
    pause();
  }
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songImg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});
mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songImg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});