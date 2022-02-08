const caoruselSlide = document.querySelector('.carousel-slide');
const caoruselImages = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');


let counter = 1;
const size = caoruselImages[0].clientWidth;

caoruselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

nextBtn.addEventListener('click', ()=> {
    if(counter >= caoruselImages.length -1) return;
    caoruselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    caoruselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

prevBtn.addEventListener('click', ()=> {
    if(counter <= 0) return;
    caoruselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    caoruselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'

});

caoruselSlide.addEventListener('transitionend', ()=>{
    if(caoruselImages[counter].id === 'lastClone'){
        caoruselSlide.style.transition = "none";
        counter = caoruselImages.length - 2;
        caoruselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'
    }
    if(caoruselImages[counter].id === 'firstClone'){
        caoruselSlide.style.transition = "none";
        counter = caoruselImages.length - counter;
        caoruselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'
    }
})


