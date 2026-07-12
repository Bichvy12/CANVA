const track = document.querySelector('.values-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const openBtn = document.getElementById('mobileMenuBtn');
const overlay = document.getElementById('mobileMenuOverlay');
const scrim = document.getElementById('mobileMenuScrim');
const closeBtn = document.getElementById('mobileMenuClose');
const backBtn = document.getElementById('mobileMenuBack');
const level1 = document.getElementById('mobileMenuLevel1');
const level2 = document.getElementById('mobileMenuLevel2');
const level2Title = document.getElementById('mobileMenuLevel2Title');
const level2Content = document.getElementById('mobileMenuLevel2Content');
const rows = document.querySelectorAll('.mobile-menu-row');
const headings = document.querySelectorAll('.footer-heading');
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
function mobileMenu() {
    if (!openBtn || !overlay) return;
    let savedScrollY = 0;
    function openMenu() {
        savedScrollY = window.scrollY;
        overlay.classList.add('open');
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        overlay.classList.remove('open');
        level2.classList.remove('open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, savedScrollY);
    }
    function showLevel2(key, label) {
        const source = document.querySelector('.header-menu-item.' + key);
        if (!source) return;
        level2Title.textContent = label;
        level2Content.innerHTML = '';
        source.querySelectorAll('.menu-column').forEach((col) => {
            level2Content.appendChild(col.cloneNode(true));
        });
        level2.classList.add('open');
    }
    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    scrim.addEventListener('click', closeMenu);
    backBtn.addEventListener('click', () => level2.classList.remove('open'));
    rows.forEach((row) => {
        row.addEventListener('click', () => {
            const key = row.getAttribute('data-target');
            const label = row.querySelector('.label').textContent;
            showLevel2(key, label);
        });
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 899) {
            closeMenu();
        }
    });
}
function footerAccordion() {
    headings.forEach((heading) => {
        heading.addEventListener('click', () => {
            const list = heading.nextElementSibling;
            if (!list || !list.classList.contains('footer-list')) return;
            const isOpen = heading.classList.contains('open');
            heading.classList.toggle('open', !isOpen);
            list.classList.toggle('open', !isOpen);
        });
    });
}
scrollValues()
mobileMenu()
footerAccordion()