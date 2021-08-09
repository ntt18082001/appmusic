'use strict'

const PLAYER_STORAGE_KEY = 'player_';
const LIST_SONG_SORT = 'listSong_';

const cd = document.querySelector(".cd");
const nameHeading = document.querySelector('header h2');
const cdThumb = document.querySelector('.cd-thumb');
const audio = document.querySelector("#audio");
const btnPlay = document.querySelector(".btn-toggle-play");
const progress = document.querySelector("#progress");

const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");
const btnRandom = document.querySelector('.btn-random');
const btnRepeat = document.querySelector(".btn-repeat");
const btnVolume = document.querySelector("#volume");
const listSong = document.querySelector(".playlist");
const btnVolumeIcon = document.querySelector("#volumeIcon");
const clock = document.querySelector("#clock");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    isNewTime: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Hãy Trao Cho Anh',
            singer: 'Sơn Tùng MTP',
            path: './App/mp4/Hãy-Trao-Cho-Anh.mp3',
            image: './App/img/1562051254964_500.jpg',
            displayOrder: 0,
        },
        {
            name: 'Muộn Rồi Mà Sao Còn',
            singer: 'Sơn Tùng MTP',
            path: './App/mp4/Muộn-Rồi-Mà-Sao-Còn.mp3',
            image: './App/img/1619691182261_500.jpg',
            displayOrder: 1
        },
        {
            name: 'Em Của Ngày Hôm Qua',
            singer: 'Sơn Tùng MTP',
            path: './App/mp4/Em-Của-Ngày-Hôm-Qua.mp3',
            image: './App/img/1511029438465_500.jpg',
            displayOrder: 2
        },
        {
            name: 'Chạy Ngay Đi (Onionn Remix)',
            singer: 'Sơn Tùng MTP',
            path: './App/mp4/Chạy-Ngay-Đi-(Onionn-Remix).mp3',
            image: './App/img/1530757472153_500.jpg',
            displayOrder: 3
        },
        {
            name: 'Túy Âm',
            singer: 'Xesi x Masew x Nhat Nguyen',
            path: './App/mp4/Tuy-Am-Xesi-Masew-Nhat-Nguyen.mp3',
            image: './App/img/f9c0475ec02716554fba3f63e5b4ac37_1504991428.jpg',
            displayOrder: 4
        },
        {
            name: 'Senorita',
            singer: 'Camila Cabello',
            path: './App/mp4/Señorita.mp3',
            image: './App/img/1561114102335_500.jpg',
            displayOrder: 5
        },
        {
            name: 'Havana',
            singer: 'Camila Cabello',
            path: './App/mp4/Havana.mp3',
            image: './App/img/1502075660969_500.jpg',
            displayOrder: 6
        },
        {
            name: '1 Phút',
            singer: 'Andiez',
            path: './App/mp4/1-Phut-Andiez.mp3',
            image: './App/img/fd4276c762a53e86ec980bb373a5a805_1504774753.jpg',
            displayOrder: 7
        },
        {
            name: 'Yêu 5',
            singer: 'Rhymastic',
            path: './App/mp4/Yeu-5-Rhymastic.mp3',
            image: './App/img/b5aa78aa102467e5648160a4ac93df8e_1486467660.jpg',
            displayOrder: 8
        },
        {
            name: 'Níu Duyên',
            singer: 'Lê Bảo Bình',
            path: './App/mp4/Níu-Duyên.mp3',
            image: './App/img/1607308157174_500.jpg',
            displayOrder: 9
        },
        {
            name: 'Trắc Trở',
            singer: 'X2X',
            path: 'https://f9-stream.nixcdn.com/NhacCuaTui1017/TracTro-X2X-7040184.mp3?st=RULJaXBM0fXn9Y0KgkbGGQ&e=1628542479',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2021/06/28/8/4/3/c/1624872522478.jpg',
            displayOrder: 10
        },
        {
            name: 'Nàng Thơ',
            singer: 'Hoàng Dũng',
            path: 'https://aredir.nixcdn.com/NhacCuaTui1001/NangTho-HoangDung-6413381.mp3?st=edbnaxrG7wdKPnPkthEkvg&e=1628542479',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2020/07/31/c/5/8/9/1596188259603.jpg',
            displayOrder: 11
        },
        {
            name: 'Tháng Năm (Special Performance)',
            singer: 'Soobin Hoàng Sơn, SlimV',
            path: 'https://aredir.nixcdn.com/NhacCuaTui1016/ThangNamSpecialPerformance-SoobinHoangSonSlimV-7020121.mp3?st=c5TofFzKHHG5hGilWIDT6w&e=1628542479',
            image: 'https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/09/05/d/9/5/e/1567670108816.jpg',
            displayOrder: 12
        },
        {
            name: 'Cô Đơn Dành Cho Ai (Lofi Version)',
            singer: 'Lee Ken, Nal',
            path: 'https://f9-stream.nixcdn.com/NhacCuaTui1019/CoDonDanhChoAiLofiVersion-LeeKenNal-7059350.mp3?st=QRk8Ai-l8mNCKDmDwF2_Eg&e=1628542479',
            image: 'https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/02/07/7/0/f/3/1486435488320.jpg',
            displayOrder: 13
        },
        {
            name: '3107-3',
            singer: 'W/n, Duongg, Nâu, Titie',
            path: 'https://f9-stream.nixcdn.com/Unv_Audio199/31073-WNDuonggNautitie-7059323.mp3?st=WKwhZcRhlDGXY5Z5f_rhQw&e=1628542479',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2021/08/02/f/d/b/3/1627913895076.jpg',
            displayOrder: 14
        },
    ],
    icon: { fas: 'fas', mute: 'fa-volume-mute', volumeDown: 'fa-volume-down', volumeUp: 'fa-volume-up' },
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    getSong: function(index) {
        return this.songs[index];
    },
    render: function () {
        this.songs.sort(function (a, b) {
            return a.displayOrder - b.displayOrder;
        });
        const htmls = this.songs.map((song, index) => {
            return `<div draggable="true" class="song ${index === this.currentIndex ? 'activeSong' : ''}" data-index="${index}">
                       <div class="thumb" style="background-image: url('${song.image}')"></div>
                       <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                             <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>`;
        });
        listSong.innerHTML = htmls.join('');
    },
    renderIcon: function (fas = this.icon.fas, classIcon = this.icon.volumeUp) {
        document.querySelector("header div #volumeIcon").className = '';
        document.querySelector("header div #volumeIcon").classList.add(fas, classIcon);
    },
    renderTime: function (timeAudio, timeDefault) {
        timeAudio = this.handleTime(timeAudio);
        timeDefault = this.handleTime(timeDefault);
        document.querySelector("#timeDefault").textContent = timeDefault;
        document.querySelector("#timeAudio").textContent = timeAudio;
    },
    handleTime: function (time) {
        if (time !== undefined || time !== null || time !== NaN) {
            let s = time % 60;
            let temp = time - s;
            let m = temp / 60;
            if (s < 10) {
                s = "0" + Math.floor(s).toString();
            } else {
                s = Math.floor(s);
            }
            return time = m + ":" + s;
        } else {
            return time = '0:0';
        }
    },
    handleCountTime: function(time) {
        Toast
        if(document.querySelector('.timeCount').textContent != ''){
            Toast.danger('Vui lòng chờ thời gian trước đó chạy xong!');
            return;
        } else {
            let count = 59;
            --time;
            if(time >= 0){
                var countTime = setInterval(function(){
                    document.querySelector(".timeCount").innerText = (time < 10 ? '0' + time : time) + ":" + (count < 10 ? '0' + count : count);
                    count--;
                    if(count < 0){
                        time--;
                        count = 59;
                    }
                    if(time < 0) {
                        clearInterval(countTime);
                        this.isNewTime = !this.isNewTime;
                        document.querySelector(".timeCount").innerText = '';
                        audio.pause();
                    }
                }, 1000);
            }
        }
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;
        let show = false;
        let hour = document.querySelector(".hour");
        let optionsTime = document.querySelectorAll('.hour ul li');
        let submitTime = document.querySelector("#ok");
        let inputTime = document.querySelector("#timer");
        const animateRotate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        });
        animateRotate.pause();
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };
        btnPlay.onclick = function (ev) {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };
        audio.onplay = function () {
            _this.isPlaying = true;
            document.querySelector(".player").classList.add('playing');
            animateRotate.play();
        };
        audio.onpause = function () {
            _this.isPlaying = false;
            document.querySelector(".player").classList.remove('playing');
            animateRotate.pause();

            if (_this.isRandom && this.ended) {
                _this.randomSong();
                _this.loadCurrentSong();
                _this.render();
                audio.play();
            } else if (this.ended && _this.isRepeat) {
                _this.repeatSong();
                _this.loadCurrentSong();
                _this.render();
                audio.play();
            } else if (this.ended) {
                _this.nextSong();
            }
        };
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
                _this.renderTime(audio.duration, audio.currentTime);
            }
        };
        progress.onchange = function (ev) {
            const changeTime = audio.duration / 100 * ev.target.value;
            audio.currentTime = changeTime;
        };
        btnVolume.oninput = function (ev) {
            audio.volume = ev.target.value / 100;
            if (ev.target.value >= 50) {
                _this.renderIcon(_this.icon.fas, _this.icon.volumeUp);
            } else if (ev.target.value > 0 && ev.target.value < 50) {
                _this.renderIcon(_this.icon.fas, _this.icon.volumeDown);
            } else {
                _this.renderIcon(_this.icon.fas, _this.icon.mute);
            }
        };
        btnNext.onclick = function () {
            progress.value = 0;
            _this.nextSong();
        };
        btnPrev.onclick = function () {
            progress.value = 0;
            _this.prevSong();
        };
        btnRandom.onclick = function () {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            this.classList.toggle('activeRandom');
            if (_this.isRepeat) {
                console.log("123");
                _this.isRepeat = !_this.isRepeat;
                _this.setConfig('isRepeat', _this.isRepeat);
                btnRepeat.classList.toggle('activeRandom');
            }
        };
        btnRepeat.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            this.classList.toggle('activeRandom');
            if (_this.isRandom) {
                _this.isRandom = !_this.isRandom;
                _this.setConfig('isRandom', _this.isRandom);
                btnRandom.classList.toggle('activeRandom');
            }
        };
        $(document).on('click', '.song', function(ev){
            const song = ev.target.closest('.song');
            if (song.getAttribute('data-index') != _this.config.indexSong ?? _this.currentIndex) {
                _this.currentIndex = parseInt(song.getAttribute('data-index'));
                _this.setConfig('indexSong', _this.currentIndex);
                _this.loadCurrentSong();
                _this.render();
                audio.play();
            }
        });
        $(document).on('mousedown', '.song', function(ev){
            var dragSrcEl = ev.target.closest('.song');
            function dragStart(e) {
                this.style.opacity = '0.4';
                dragSrcEl = this;
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', this.innerHTML);
            };

            function dragEnter(e) {
                this.classList.add('over');
            }

            function dragLeave(e) {
                e.stopPropagation();
                this.classList.remove('over');
            }

            function dragOver(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                return false;
            }

            function dragDrop(e) {
                if (dragSrcEl != this) {
                    dragSrcEl.innerHTML = this.innerHTML;
                    this.innerHTML = e.dataTransfer.getData('text/html');
                    let songMove = _this.getSong(dragSrcEl.getAttribute('data-index'));
                    let songThis = _this.getSong(this.getAttribute('data-index'));
                    songThis.displayOrder = [songMove.displayOrder, songMove.displayOrder = songThis.displayOrder][0];
                    this.setAttribute('data-index', songMove.displayOrder);
                    dragSrcEl.setAttribute('data-index', songThis.displayOrder);
                    _this.songs.sort(function(a, b) {
                        return a.displayOrder - b.displayOrder;
                    });
                    if(dragSrcEl.className.split(' ').indexOf('activeSong')>=0){
                        _this.setConfig('indexSong', songMove.displayOrder);
                        dragSrcEl.classList.remove('activeSong');
                        this.classList.add('activeSong');
                    } else if(this.className.split(' ').indexOf('activeSong')>=0) {
                        _this.setConfig('indexSong', songThis.displayOrder);
                        this.classList.remove('activeSong');
                        dragSrcEl.classList.add('activeSong');
                    }
                    _this.setConfig('progressValue', progress.value);
                    _this.setConfig('currentTimeSong', audio.currentTime);
                    _this.setConfig('volume', btnVolume.value);
                    _this.setConfig('durationAudio', audio.duration);
                    _this.setConfig('listSong', _this.songs);
                    _this.loadConfig();
                    _this.render();
                    audio.pause();
                }
                return false;
            }

            function dragEnd(e) {
                var listItems = document.querySelectorAll('.song');
                [].forEach.call(listItems, function (item) {
                    item.classList.remove('over');
                });
                this.style.opacity = '1';
            }

            function addEventsDragAndDrop(el) {
                el.addEventListener('dragstart', dragStart, false);
                el.addEventListener('dragenter', dragEnter, false);
                el.addEventListener('dragover', dragOver, false);
                el.addEventListener('dragleave', dragLeave, false);
                el.addEventListener('drop', dragDrop, false);
                el.addEventListener('dragend', dragEnd, false);
            }

            var listItems = $('.song');
            [].forEach.call(listItems, function (item) {
                addEventsDragAndDrop(item);
            });
        });
        window.onbeforeunload = function () {
            _this.setConfig('progressValue', progress.value);
            _this.setConfig('currentTimeSong', audio.currentTime);
            _this.setConfig('volume', btnVolume.value);
            _this.setConfig('durationAudio', audio.duration);
        };
        btnVolumeIcon.onclick = function () {
            const currentVolume = btnVolume.value;
            _this.isMute = !_this.isMute;
            this.className = '';
            if (_this.isMute) {
                btnVolume.value = 0;
                audio.volume = 0;
                _this.renderIcon(_this.icon.fas, _this.icon.mute);
            } else if (_this.config.volume > 0 && _this.config.volume < 50) {
                btnVolume.value = _this.config.volume;
                audio.volume = _this.config.volume / 100;
                _this.renderIcon(_this.icon.fas, _this.icon.volumeDown);
            } else {
                btnVolume.value = _this.config.volume;
                audio.volume = _this.config.volume / 100;
                _this.renderIcon(_this.icon.fas, _this.icon.volumeUp);
            }
            _this.setConfig('volume', currentVolume);
        };
        clock.onclick = function() {
            show = !show;
            if(show){
                hour.style.display = 'flex';
            } else {
                optionsTime.forEach(el => el.classList.remove('activeTime'));
                hour.style.display = 'none';
            }
        };
        document.querySelector('#close').onclick = function() {
            hour.style.display = 'none';
            optionsTime.forEach(el => el.classList.remove('activeTime'));
            if(show){
                show = !show;
            }
        };
        optionsTime.forEach(item => item.addEventListener('click', function(ev){
            optionsTime.forEach(el => el.classList.remove('activeTime'));
            inputTime.value = '';
            ev.currentTarget.classList.add('activeTime');
        }));
        submitTime.onclick = function(ev) {
            const li = document.querySelector('.hour ul li.activeTime');
            if(li){
                let value = parseInt(li.getAttribute('data-value'));
                optionsTime.forEach(el => el.classList.remove('activeTime'));
                _this.handleCountTime(value);
            } else if(inputTime.value != '') {
                _this.handleCountTime(parseInt(inputTime.value));
                inputTime.value = '';
            }
            hour.style.display = 'none';
        };
        inputTime.onfocus = function() {
            optionsTime.forEach(item => item.classList.remove('activeTime'));
        }
    },
    swapSong: function(a, b) {
        let temp = a;
        a = b;
        b = temp;
    },
    loadCurrentSong: function () {
        nameHeading.innerText = this.currentSong.name;
        document.title = this.currentSong.name + " - " + this.currentSong.singer;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.volume = btnVolume.value / 100;
        audio.setAttribute('src', this.currentSong.path);
        this.setConfig('indexSong', this.currentIndex);
    },
    loadSong: function(e) {
        const songs = document.querySelectorAll('.song');
        songs.forEach(item => {
            item.classList.remove('activeSong');
            $(e.target).closest('.song').addClass('activeSong');
        });
        this.loadCurrentSong();
    },
    loadConfig: function () {
        if(this.config.listSong && this.songs.length == this.config.listSong.length){
            this.songs = this.config.listSong ?? this.songs;
        }
        this.isRandom = this.config.isRandom ?? false;
        this.isRepeat = this.config.isRepeat ?? false;
        progress.value = this.config.progressValue ?? 0;
        audio.currentTime = this.config.currentTimeSong ?? 0;
        this.currentIndex = this.config.indexSong ?? 0;
        btnVolume.value = this.config.volume;
        this.renderTime(this.config.durationAudio ?? 245.688, this.config.currentTimeSong ?? 0);
        btnRandom.classList.toggle('activeRandom', this.isRandom);
        btnRepeat.classList.toggle('activeRandom', this.isRepeat);
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length - 1) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        this.render();
        audio.play();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong();
        this.render();
        audio.play();
    },
    randomSong: function () {
        this.currentIndex = Math.floor(Math.random() * ((this.songs.length - 1) - 0 + 1)) + 0;
    },
    repeatSong: function () {
        this.currentIndex = this.currentIndex;
    },
    start: function () {
        this.loadConfig();
        this.defineProperties();
        this.handleEvents();
        this.loadCurrentSong();
        this.renderIcon(this.icon.fas, (this.config.volume >= 50 ? this.icon.volumeUp : (this.config.volume > 0 && this.config.volume < 50) ? this.icon.volumeDown : this.icon.mute));
        this.render();
    }
};
app.start();