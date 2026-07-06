const track = document.querySelector('.values-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
function scrollValues() {
    if (!track || !prevBtn || !nextBtn) return;
    const scrollAmount = 705;
    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    track.addEventListener('scroll', () => {
        if (track.scrollLeft <= 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
        }
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'flex';
        }
    });
}
scrollValues()