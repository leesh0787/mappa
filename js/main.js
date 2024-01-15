gsap.config({ nullTargetWarn: false });

// 레니스

gsap.registerPlugin(ScrollTrigger);

let lenis;

const initSmoothScrolling = () => {
	lenis = new Lenis({
		lerp: 0.1,
		smoothWheel: true,
		ease: "linear"
	});
	lenis.on('scroll', () => ScrollTrigger.update());

	const scrollFn = (time) => {
		lenis.raf(time);
		requestAnimationFrame(scrollFn);
	};
	requestAnimationFrame(scrollFn);
};

initSmoothScrolling();
//--------------------------------------

Splitting();

//--------------------------------------
// 🍎 인트로

function initIntro() {

	// 화면 사이즈가 1024보다 낮으면 인트로X
	function setupEventListeners() {
		const introBtn = document.querySelector('.intro_btn');
		if (window.innerWidth > 1024) {
			introBtn.addEventListener('click', introAnimation);
		} else {
			introBtn.removeEventListener('click', introAnimation);
			section2Ani()
			initNewwork()
			initNews()
			section5()
		}

		window.addEventListener('resize', setupEventListeners);
	}
	// 인트로 애니메이션 
	function introAnimation() {
		gsap.to(".intro_btn", 1, {
			opacity: 0,
			y: -40,
			ease: Expo.easeOut,
		});

		gsap.to(".intro_bg", 1, {
			opacity: 0,
		});
		gsap.to(".intro_bg iframe", 1, {
			display: "none",
			delay: 0.5,
		});
		gsap.to(".text-warpper>div", 1, {
			opacity: 0.1,
			delay: 1,
			stagger: 0.1,
		});

		gsap.to(".text-warpper>div", 1, {
			x: "500",
			ease: Expo.easeOut,
			delay: 1.5,
			stagger: 0.1,
		});

		gsap.to(".text-warpper", 3, {
			y: -600,
			scale: 4.5,
			rotate: -70,
			ease: Expo.easeOut,
			delay: 2,
		});

		gsap.to(".intro_text", 1, {
			opacity: 1,
			ease: Expo.easeOut,
			delay: 3,
		});

		gsap.to(".text-warpper>div", 4, {
			x: "-3500",
			ease: Expo.easeOut,
			delay: 3.5,
			stagger: 0.05,
		});

		gsap.to(".text-container", 2.5, {
			bottom: "-100%",
			opacity: 0,
			display: "none",
			ease: Expo.easeOut,
			delay: 6,
		});

		gsap.to(".intro_text", 1.5, {
			opacity: 0,
			display: "none",
			delay: 6,
		});

		gsap.to(".intro", {
			opacity: 0,
			display: "none",
			duration: 1,
			delay: 6,
		});
		gsap.to(".header", 2, {
			opacity: 1,
			delay: 6.2,
		});

		gsap.to(".logo", 2, {
			top: "0%",
			bottom: "0%",
			opacity: 1,
			delay: 6.5,
			pointerEvents: 'all'
		});

		gsap.to(".logo>img", 2, {
			opacity: 1,
			delay: 6.5,
		});

		gsap.to(".logo", 2, {
			width: "10vw",
			height: "9vh",
			delay: 8,
		});

		gsap.to(".nav", 1, {
			y: 30,
			delay: 9,
			opacity: 1
		});

		gsap.to(".top_scroll", 1, {
			bottom: "3%",
			delay: 9,
			opacity: 1
		})

		gsap.to(".music-player-container", 1, {
			delay: 9,
			opacity: 1
		})

		gsap.to(".music-desc", 1, {
			delay: 9,
			opacity: 1
		})

		gsap.to(".wrap", {
			overflow: "visible",
			delay: 9,
			onComplete: function () {
				section2Ani()
				initNewwork()
				initNews()
				section5()
			},
		});

	}

	setupEventListeners();
}

initIntro()
//--------------------------------------

// 🍎 section1

function initMusic() {
	//변수
	let musicPlayer = document.querySelector(".music-player-container");
	let togglePlayer = document.querySelector(".toggle-player");
	let trackInfo = document.querySelector(".track-info");
	let trackName = document.querySelector(".track-name");
	let trackNav = document.querySelector(".track-nav")
	let trackArtist = document.querySelector(".track-artist");
	let playPauseBtn = document.querySelector(".playpause-track");
	let playNextBtn = document.querySelector(".next-track");
	let playPrevBtn = document.querySelector(".prev-track");
	let soundBars = document.querySelector(".sound-bars");
	let avatarImage = document.querySelector(".avatar_img");
	let musicDesc = document.querySelector('.music-desc')

	let trackIndex = 0;
	let isPlaying = false;
	let isHidden = true;

	let currentTrack = document.createElement("audio");
	let soundBarsLoiite = bodymovin.loadAnimation({
		container: soundBars,
		renderer: "svg",
		loop: true,
		autoPlay: false,
		path: "./img/soundbar.json"
	});

	// 트랙리스트
	let trackList = [{
			name: "회회기담",
			artist: "eve",
			path: "./songs/회회기담.mp3",
			avatar: "https://i2.ruliweb.com/thumb/23/09/23/18abf29d4484ddc40.webp"
		},
		{
			name: "푸르름이 사는곳",
			artist: "키타니 타츠야",
			path: "./songs/푸르름이 사는곳.mp3",
			avatar: "https://i2.ruliweb.com/thumb/23/09/23/18abf29d4484ddc40.webp"
		},
		{
			name: "The Rumbling",
			artist: "Sim",
			path: "./songs/TheRumbling.mp3",
			avatar: "https://mblogthumb-phinf.pstatic.net/MjAyMTAxMDJfMTg5/MDAxNjA5NTM4OTExMzE4.53lRRKvM5A0wLI39pxmZuvmiozAjqgGNQi8ac8s-a9Mg.bS1oQaZq4PhPpRUOezQ2E8P3htMnk4mR8ZvVUhXD_rYg.PNG.kodudgh12/MONS_2375.png?type=w800"
		},
		{
			name: "KICK BACK",
			artist: "요네즈 켄시",
			path: "./songs/KickBack.mp3",
			avatar: "./img/체인소맨_avatar.png"
		},
	];
	// 트랙을 로드하고 UI 업데이트하는 함수
	function loadTrack(index) {
		currentTrack.src = trackList[index].path;
		currentTrack.load();
		trackName.textContent = trackList[index].name;
		trackArtist.textContent = trackList[index].artist;
		updateAvatarImage(index);
	}
	// Avatar 이미지를 업데이트하는 함수
	function updateAvatarImage(index) {
		avatarImage.src = trackList[index].avatar;
	}
	// 트랙 정보를 업데이트하는 함수
	function updateTrackInfo(index) {
		trackName.textContent = trackList[index].name;
		trackArtist.textContent = trackList[index].artist;
		updateAvatarImage(index);
	}
	// 재생/일시 정지 버튼 클릭 시 실행되는 함수
	function playPause() {
		if (isPlaying) {
			currentTrack.pause();
			soundBarsLoiite.pause();
			playPauseBtn.innerHTML = "<ion-icon name='play-sharp'></ion-icon>";
		} else {
			currentTrack.src = trackList[trackIndex].path;
			currentTrack.play();
			soundBarsLoiite.play();
			playPauseBtn.innerHTML = "<ion-icon name='pause-sharp'></ion-icon>";
		}
		isPlaying = !isPlaying;
	}
	// 다음 트랙 재생
	function playNextTrack() {
		trackIndex = (trackIndex + 1) % trackList.length;
		playTrackAtIndex(trackIndex);
	}
	// 이전 트랙 재생
	function playPrevTrack() {
		trackIndex = (trackIndex - 1 + trackList.length) % trackList.length;
		playTrackAtIndex(trackIndex);
	}
	// 특정 인덱스의 트랙을 재생
	function playTrackAtIndex(index) {
		currentTrack.src = trackList[index].path;
		currentTrack.play();
		soundBarsLoiite.play();
		isPlaying = true;
		playPauseBtn.innerHTML = "<ion-icon name='pause-sharp'></ion-icon>";
		updateTrackInfo(index);
	}
	// toggle-player 누르면 메뉴 열고 닫히기
	function toglleTab() {
		isHidden = !isHidden;
		musicPlayer.classList.toggle("hide", !isHidden);
		togglePlayer.innerHTML = isHidden ? "<ion-icon name='remove-outline'></ion-icon>" : "<ion-icon name='add-outline'></ion-icon>";
		trackInfo.style.transitionDelay = isHidden ? "0.4s" : "0s";
		trackNav.style.transitionDelay = isHidden ? "0.4s" : "0s";
		musicDesc.classList.toggle("hide")
	}

	// 이벤트핸들러
	togglePlayer.addEventListener("click", toglleTab);
	playPauseBtn.addEventListener("click", playPause);
	currentTrack.addEventListener("ended", playNextTrack);
	playPrevBtn.addEventListener("click", playPrevTrack);
	playNextBtn.addEventListener("click", playNextTrack);

}

initMusic()

// 🍎 section2

function section2Ani() {

	function titAni() {
		let gsapStar = document.querySelectorAll('.star')
		gsapStar.forEach((star, i) => {
			let rotate = gsap.from(star, {
				duration: 3,
				rotation: 720,
			})
			ScrollTrigger.create({
				trigger: star,
				animation: rotate,
				start: "top bottom",
				scrub: 1.9,
			})
		})
		const titBox = gsap.utils.toArray('.tit_box');
	
		titBox.forEach((box) => {
	
			let tit = box.querySelector('.tit');
			let titChar = tit.querySelectorAll('.char')
			let titImg = box.querySelector('.tit_img');
			let titImg2 = box.querySelector('.tit_img2');
	
			gsap.set(titChar,{
				yPercent:130
			})
	
			gsap.set(titImg, {
				x: -200
			});
			gsap.set(titImg2, {
				opacity: 0,
				x: -200
			});
			
			gsap.to(titChar,{
				scrollTrigger:{
					trigger: box,
					start: "top center",
					toggleActions: "play none none none",
				},
				yPercent:0,
				stagger:0.1,
				// ease: "back.out",
			})
	
			let tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: box,
					start: "top 70%",
					end: "top 10%",
					toggleActions: "play none none none",
					scrub: 1,
				},
	
			});
	
			tl2.to(titImg, 4, {
				x: 0,
			});
	
			tl2.to(titImg2, 4, {
				x: 0,
				opacity: 1,
			}, "<");
	
		});
	}
	
	function aboutAni() {
		let star2 = document.querySelector('.star2')
		gsap.to(star2, {
			scrollTrigger: {
				trigger: ".about_cont",
				start: "top top",
				end: "200% bottom",
				scrub: 1,
			},
			offsetDistance: "100%",
			rotation: 720,
			duration: 2,
		})
		// gsap.set(".about_cont_left p .word",{opacity:0})
		gsap.from(".about_cont_left p .word",{
			scrollTrigger:{
				trigger:".about_cont_left",
				start:"top 50%",
				end:"+=300"
			},
			opacity:0,
			stagger:0.04
		})
	
		gsap.set(".img_inner>img", {
			clipPath: `polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)`,
		})
		gsap.set(".img_inner", {
			clipPath: `polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)`,
		})
		let lTl = gsap.timeline({
			scrollTrigger: {
				trigger: ".about_cont_left",
				start: "top center",
			}
		});
		let rTl = gsap.timeline({
			scrollTrigger: {
				trigger: ".about_cont_right",
				start: "top center",
			}
		});
		lTl.to(".about_cont_left .img_inner", 1, {
			clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
			ease: "expo.out",
		});
		lTl.to(".about_cont_left .img_inner>img", 1.5, {
			clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
			ease: "expo.out",
		}, "-=0.5");
		rTl.to(".about_cont_right .img_inner", 1, {
			clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
			ease: "expo.out",
		});
		rTl.to(".about_cont_right .img_inner>img", 1.5, {
			clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
			ease: "expo.out",
		}, "-=0.5");
	}

	titAni()
	aboutAni()
}



// 🍎 section3

function initNewwork(){
	let scrollBody = document.querySelector('.section3'),
	scrollHeight, //스크롤의 높이값
	sectionOffsetTop,
	sectionScrollTop,
	scrollRealHeigth, // 실제로 스크롤해야할 높이
	winScrollTop, // 스크롤바의 높이를 담을 변수
	scrollPercent, // 스크롤 백분율 
	percent;


function scrollFuc() {
	setProperty()
	contentIn()

}

function setProperty() {
	scrollHeight = scrollBody.offsetHeight;
	sectionOffsetTop = scrollBody.offsetTop;
	scrollRealHeigth = scrollHeight - window.innerHeight
	winScrollTop = pageYOffset
	sectionScrollTop = winScrollTop - sectionOffsetTop
	scrollPercent = sectionScrollTop / scrollRealHeigth
	percent = scrollPercent * 100
}

function updateVideoOpacity(videoSelector, opacity) {
	document.querySelector(videoSelector).style.opacity = opacity;
}

function contentIn() {
	let deviceImg = document.querySelectorAll('.img_slide img')
	let imgWidth = deviceImg[0].offsetWidth // 이미지 하나의 넓이값

	if (percent >= 0 && percent < 23) {
		imageCHage(imgWidth * 0)
		updateVideoOpacity('.sec3_video1', 1);
		playVideo('.sec3_video1');
	} else {
		updateVideoOpacity('.sec3_video1', 0);
		stopVideo('.sec3_video1');
	}
	if (percent >= 23 && percent < 48) {
		imageCHage(imgWidth * 1)
		updateVideoOpacity('.sec3_video2', 1);
		playVideo('.sec3_video2');
	} else {
		updateVideoOpacity('.sec3_video2', 0);
		stopVideo('.sec3_video2');

	}
	if (percent >= 48 && percent < 73) {
		imageCHage(imgWidth * 2)
		updateVideoOpacity('.sec3_video3', 1);
		playVideo('.sec3_video3');
	} else {
		updateVideoOpacity('.sec3_video3', 0);
		stopVideo('.sec3_video3');
	}
	if (percent >= 73 && percent < 97) {
		imageCHage(imgWidth * 3)
		updateVideoOpacity('.sec3_video4', 1);
		playVideo('.sec3_video4');
	} else {
		updateVideoOpacity('.sec3_video4', 0);
		stopVideo('.sec3_video4');
	}
	if (percent >= 97 && percent < 120) {
		imageCHage(imgWidth * 4)
		updateVideoOpacity('.sec3_video5', 1);
		playVideo('.sec3_video5');
	} else {
		updateVideoOpacity('.sec3_video5', 0);
		stopVideo('.sec3_video5');
	}
	// console.log(imgWidth)
}

function imageCHage(movex) {
	let img = document.querySelector('.img_slide')

	img.style.transform = `translateX(${-movex}px)`
}

function playVideo(videoSelector) {
	let video = document.querySelector(videoSelector);
	if (!video.paused) return; // Check if video is already playing
	video.play();
}

function stopVideo(videoSelector) {
	let video = document.querySelector(videoSelector);
	video.pause();
}

window.addEventListener('scroll', () => {
	scrollFuc()
})
}


// 🍎 section4

function initNews() {
	let section4 = document.querySelector('.section4');
	let slidePhoto = document.querySelector('#slidePhoto');
	let slidePhotos = document.querySelector('#slidePhotos');
	let one = document.querySelector('#one')

	one.addEventListener("mousemove", function (e) {
		let mouseX = e.clientX;
		let mouseY = e.clientY;

		// slidePhoto의 크기를 고려하여 마우스 위치 조절
		let offsetX = slidePhoto.offsetWidth / 2;
		let offsetY = slidePhoto.offsetHeight / 2;

		slidePhoto.style.top = `${mouseY - offsetY}px`;
		slidePhoto.style.left = `${mouseX - offsetX}px`;
		slidePhoto.style.transform = `translate(${-offsetX * 0.2}px,${-offsetY * 0.2}px)`;
	});

	function handleMouseEnter(element, marginTopValue) {
		element.addEventListener("mousemove", function () {
			slidePhotos.style.marginTop = `${marginTopValue}%`;
			slidePhoto.style.display = 'block';
		});

		element.addEventListener("mouseleave", function () {
			// slidePhotos.style.marginTop = "0%";
			slidePhoto.style.display = 'none';
		});
	}

	handleMouseEnter(document.querySelector('#chainn'), 0);
	handleMouseEnter(document.querySelector('#aty'), -120);
	handleMouseEnter(document.querySelector('#mic'), -240);
	handleMouseEnter(document.querySelector('#Tabso'), -360);
	handleMouseEnter(document.querySelector('#titan'), -480);

}


// 🍎 section5


function section5(){
	const position = [
		{ top:"0%", left:"0%",}, //1
		{ top:"0%", left:"12vw",}, //2
		{ top:"0%", left:"24vw",}, //3
		{ top:"0%", left:"36vw",}, //4 
		{ top:"32vh", left:"0%",}, //5
		{ top:"32vh", left:"12vw",}, //6
		{ top:"32vh", left:"24vw", }, //7
		{ top:"32vh", left:"36vw",}, //8
		{ top:"64vh", left:"0%",}, //9
		{ top:"64vh", left:"12vw",}, //10
		{ top:"64vh", left:"24vw",}, //11
		{ top:"64vh", left:"36vw",}, //12
	]
	
	const imgs = document.querySelectorAll('.work_gallery_img');
	
	gsap.set(imgs,{
		top:"45%",
		left:"50%",
		transform:`translate(-50%, -50%) scale(0)`
	})
	
	let galleryTl = gsap.timeline({
		scrollTrigger:{
			trigger:'.section5',
			start:'top center'
		}
	})
	
	galleryTl.to('.work_gallery_img',1,{
		scale:1,
		width:"300px",
		height:"400px",
		stagger:0.05,
		ease:"power2.out",
		onComplete:scatterAndShrim
	});
	
	
	function scatterAndShrim(){
		gsap.to('.work_gallery_img',{
			top:(i) => position[i].top,
			left:(i) => position[i].left,
			width:"12vw",
			height:"32vh",
			transform:"none",
			stagger:0.07,
			duration:0.7,
			ease:"power2.out"
		})
	}
	
	function blurEffect(){
		const elementsToBlur = 
		document.querySelectorAll('.work_cont_left, .work_gallery_img:not([data-enlarged="true"])');
		gsap.to(elementsToBlur,{
			filter:'blur(20px)',
			duration:0.75,
			ease:"power2.out"
		});
	};
	
	function removeBlurEffect(){
		const elementsToBlur = 
		document.querySelectorAll('.work_cont_left, .work_gallery_img:not([data-enlarged="true"])');
		gsap.to(elementsToBlur,{
			filter:'blur(0px)',
			duration:1,
			ease:"power2.out"
		});
	}
	
	function toggleImageSize(event) {
		const img = event.currentTarget;
		const isEnlarged = img.dataset.enlarged === "true";
		const originalPosition = JSON.parse(img.dataset.originalPosition);
		const viewportWidth = window.innerWidth;
		console.log(viewportWidth)
		const viewportHeight = window.innerHeight;
	
			if (!isEnlarged) {
				const enlargedWidth = 500;
				const enlargedHeight = 600;
				const centeredLeft = (viewportWidth/10 - enlargedWidth)/2;
				const centeredTop = (viewportHeight - enlargedHeight)/2;
				const topCorrection = 75;
				const correctedTop = centeredTop - topCorrection;
	
				gsap.to(img, {
					zIndex: 1000,
					top: centeredTop + 'px',
					left: centeredLeft + 'px',
					width: enlargedWidth + 'px',
					height: enlargedHeight + 'px',
					ease: "power4.out",
					duration: 1,
				});
				img.dataset.enlarged = "true";
				blurEffect();
			} else {
				setTimeout(() => removeBlurEffect(), 100);
	
				gsap.to(img, {
					zIndex: 1,
					top: originalPosition.top,
					left: originalPosition.left,
					width: "12vw",
					height: "32vh",
					ease: "power4.out",
					duration: 1,
				});
				img.dataset.enlarged = "false";
			}
	
	}
	
	imgs.forEach((img, i) => {
		img.dataset.originalPosition = JSON.stringify(position[i]);
		img.dataset.enlarged = 'false';
		img.addEventListener('mousedown', toggleImageSize);
	});
	

}
	



// 🍎 footer

window.onload = function(){
	let footerCards = document.querySelectorAll('.footer_card'); // 
	let total = footerCards.length;
	let container = document.querySelector('.footer_container');

	for(let i = 0; i < total; i++){
			let angle = (360 / total) * i;
			let transform = `rotate(${angle}deg) translate(55vh)`;
			footerCards[i].style.transform = transform;
			let footerItem = footerCards[i].querySelectorAll('.footer_item');
			
			for(let j = 0; j < footerItem.length; j++){
					footerItem[j].style.animationDelay = `${j * 0.5}s`;
			}
	}
}

//scroll to

function scrollEvent (){
	function scrollToSection1() {
		document.querySelector('.section1').scrollIntoView({
			behavior: 'smooth'
		});
	}
	
	function scrollToSection2() {
		document.querySelector('.section2').scrollIntoView({
			behavior: 'smooth'
		});
	}
	
	function scrollToAbout(e) {
		e.preventDefault()
		document.querySelector('.about').scrollIntoView({
			behavior: 'smooth'
		});
	}
	
	function scrollToGoods(e) {
		e.preventDefault()
		document.querySelector('.goods').scrollIntoView({
			behavior: 'smooth'
		});
	}
	
	function scrollToNews(e) {
		e.preventDefault()
		document.querySelector('#one').scrollIntoView({
			behavior: 'smooth'
		});
	}
	
	function scrollToWork(e) {
		e.preventDefault()
		document.querySelector('.section5').scrollIntoView({
			behavior: 'smooth'
		});
	}
	
	
	// 로고 누르면 섹션1으로 이동
	document.querySelector('.logo').addEventListener('click', scrollToSection1);
	// section1 스크롤버튼 누르면 section2로 이동
	document.querySelector('.top_scroll').addEventListener('click', scrollToSection2);
	
	// nav 
	document.querySelector('.link_about').addEventListener('click', scrollToAbout);
	document.querySelector('.link_goods').addEventListener('click', scrollToGoods);
	document.querySelector('.link_news').addEventListener('click', scrollToNews);
	document.querySelector('.link_work').addEventListener('click', scrollToWork);
}

scrollEvent()