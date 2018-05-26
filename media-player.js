
// if the browser can play this..

  var supportsVideo = !!document.createElement('video').canPlayType;
    if (supportsVideo) {

// get all the things

  var videoContainer = document.getElementById('container');
  var video = document.getElementById('video');
  var videoControls = document.getElementById('controls');
  var transcriptDiv = document.getElementById('transcript');

// buttons

  var playpause = document.getElementById('playpause');
  var mute = document.getElementById('mute');
  var fullscreen = document.getElementById('fs');

// progress bar

  var progress = document.getElementById('progress');
  var progressBar = document.getElementById('progress-bar');

// progress time

  var timeDisplay = document.getElementById('time-display');
  var currentTime = document.getElementById('current-time');
  var duration = document.getElementById('duration');

// hide default controls (in case user has javascript disabled)

  video.controls = false;

// show my video controls

  videoControls.style.display = 'block';

// format time

  function format_time(seconds) {
      var minutes = Math.floor(seconds / 60);
      minutes = (minutes >= 10) ? minutes : "0" + minutes;
      seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds : "0" + seconds;
      return minutes + ":" + seconds;
  }

// set duration of video

  video.addEventListener('loadedmetadata', function() {
    duration.innerHTML = format_time(video.duration);
  });

// progress bar

  progress.addEventListener('change', function() { // when there's a change..
    var time = video.duration * (progress.value / 100); // get new time
    video.currentTime = time; // update the time
  });

  video.addEventListener('timeupdate', function() { // when the time changes..
    var value = (100 / video.duration) * video.currentTime; // get slider value
      progress.value = value; // update slider value
      progressBar.value = value;
      currentTime.innerHTML = format_time(video.currentTime); // update current time
    for (var i = 0; i < transcript.length; i++) { // highlight transcript span
      document.getElementById(transcript[i].start).classList.remove('highlight'); // first, no highlight
    if (video.currentTime >= transcript[i].start && video.currentTime <= transcript[i].finish) { // find the right span
      document.getElementById(transcript[i].start).classList.add('highlight'); // append highlight to that span
      }
    }
  });

// progress bar - click to skip around

  progress.addEventListener('click', function(e) {
     var pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
      video.currentTime = pos * video.duration;
  });

// switch from play to pause

function togglePlayPause() {
  if (video.paused || video.ended) {
    playpause.title = 'pause';
    playpause.innerHTML = '<img src="icons/pause-icon.png">';
    playpause.className = 'pause';
    video.play();
}
  else {
    playpause.title = 'play';
    playpause.innerHTML = '<img src="icons/play-icon.png">';
    playpause.className = 'play';
    video.pause();
  }
}

// switch volume on or off

function toggleMute() {
    if (video.muted) {
      mute.title = 'mute';
      mute.innerHTML = '<img src="icons/volume-on-icon.png">';
      mute.className = 'mute';
      video.muted = false;
  }
    else {
      mute.title = 'mute';
      mute.innerHTML = '<img src="icons/volume-off-icon.png">';
      mute.className = 'mute';
      video.muted = true;
  }
}

// fullscreen

fs.addEventListener("click", function() {
  if (video.requestFullscreen) {video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {video.mozRequestFullScreen(); // firefox
  } else if (video.webkitRequestFullscreen) {video.webkitRequestFullscreen(); // chrome and safari
  }
});

// transcript

var transcript = [
  {"start": "0.00",
    "finish": "7.535",
    "text": "Now that we've looked at the architecture of the internet, let's see how you might connect your personal devices to the internet inside your house."},
  {"start": "7.536",
    "finish": "13.960",
    "text": "Well there are many ways to connect to the internet, and most often people connect wirelessly."},
  {"start": "13.961",
    "finish": "17.940",
    "text": "Let's look at an example of how you can connect to the internet."},
  {"start": "17.941",
    "finish": "30.920",
    "text": "If you live in a city or a town, you probably have a coaxial cable for cable Internet, or a phone line if you have DSL, running to the outside of your house, that connects you to the Internet Service Provider, or ISP."},
  {"start": "32.100",
    "finish": "41.190",
    "text": "If you live far out in the country, you'll more likely have a dish outside your house, connecting you wirelessly to your closest ISP, or you might also use the telephone system."},
  {"start": "42.350",
    "finish": "53.760",
    "text": "Whether a wire comes straight from the ISP hookup outside your house, or it travels over radio waves from your roof, the first stop a wire will make once inside your house, is at your modem."},
  {"start": "53.761",
    "finish": "57.780",
    "text": "A modem is what connects the internet to your network at home."},
  {"start": "57.781",
    "finish": "59.000",
    "text": "A few common residential modems are DSL or--"}
];

function prep_transcript() { // put text in transcript
  var temp;
  for (var i = 0; i < transcript.length; i++) {
    temp = document.createElement('span'); // create span
    temp.innerHTML = transcript[i].text + ' '; // add text to the span
    temp.setAttribute('id', transcript[i].start); // set id
    transcriptDiv.appendChild(temp); // append to transcript
  }
}

  prep_transcript(); // call it



}
