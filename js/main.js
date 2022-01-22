window.onload = function(){

    //typing
    $(".home-item__typing").typed({
        strings: ["안녕하세요.","방문해주셔서 감사합니다.", "웹퍼블리셔 임하나 입니다."],
        typeSpeed: 150,
        loop: true,
    });

    init();

    //init
    function init(){      
        setInterval(createSnow, 500);
        contactCard();
        pageFun();
    }

    //pageFun
    function pageFun(){
        const navbar = document.querySelector('.navbar');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const navbarItem = navbar.querySelectorAll('.navbar-link');
        const portSection = document.querySelectorAll('.port-section');
        let pageNum = 0;
        let pageTotal = portSection.length;

        for( let i=0; i<pageTotal; i++ ){
            navbarItem[i].onclick = function(e){
                e.preventDefault();
            
                pageNum = i;
                pageChange();
                window.scrollTo({
                    top : portSection[pageNum].offsetTop - navbarHeight,
                    behavior : 'smooth',
                })
            }        
        }    

        window.addEventListener('scroll', function(){
            let scrollY = this.scrollY;        

            if( scrollY > navbarHeight ){
                navbar.classList.add('fixed');
            } else {
                navbar.classList.remove('fixed');
            }

            for( let i=0; i<pageTotal; i++ ){
                pageNum = i;
                if( scrollY > portSection[pageNum].offsetTop - window.outerHeight/1.5 
                    && scrollY < portSection[pageNum].offsetTop - window.outerHeight/1.5 + portSection[pageNum].offsetHeight )
                {
                    pageChange();
                }
            }
        });

        function pageChange(){
            for( let i=0; i<pageTotal; i++ ){
                navbarItem[i].classList.remove('is-active');
                portSection[i].classList.remove('is-active');
            }
            navbarItem[pageNum].classList.add('is-active');
            portSection[pageNum].classList.add('is-active');
        }
    }

    //cardFun
    function contactCard(){
        const cardWrap = document.querySelector('.contact-item');
        const card = document.querySelector('.contact-card__item');
        const cardButton = document.querySelectorAll('.contact-card__button button');
        const bgArray = [ ['#1b2781','#3c4aad'], ['#247a22','#72ff70'], ['#f8cd07','#625516'], ['#631b81','#3c6ead'] ]; 
       
        let cardNum = 0;

        for(let i=0; i<cardButton.length; i++){
            //background: linear-gradient(#1b2781 0%, #3c4aad 100%);
            cardButton[i].style.background = `linear-gradient(${bgArray[i][0]} 0%, ${bgArray[i][1]})`;
            cardButton[i].onclick = function(){
                cardNum = i;
                cardChange();
            }
        }  

        cardWrap.addEventListener('mousemove', function(e){           
            let x = (e.clientX - cardWrap.offsetWidth/2);
            let y = (e.clientY - cardWrap.offsetHeight/2);

            let cardX =0;
            let cardy =0;

            cardX += (x-cardX) *.1;
            cardy += (y-cardy) *.1;
            
            card.style.transform = `translate3d(0,0,0) rotateX(${cardX}deg) rotateY(${cardy}deg)`;
        });

        function cardChange(){
            for(let i=0; i<cardButton.length; i++){
                cardButton[i].classList.remove('is-active');
               
            }
            cardButton[cardNum].classList.add('is-active');  
            card.style.transition = 'background-color 1000ms linear;';
            card.style.background = `linear-gradient(${bgArray[cardNum][0]} 0%, ${bgArray[cardNum][1]})`;
        }
        

    } 

    //snowFun
    function createSnow(){
        const wrap = document.querySelector('body');
        const snow = document.createElement('i');
        snow.classList.add('snow');
        snow.style.left = Math.random() * window.innerWidth + 'px';
        snow.style.top = 0;
        snow.style.opacity = Math.random();
        wrap.appendChild(snow);

        setTimeout(function(){
            snow.remove();
        }, 5000);
    } 
}


