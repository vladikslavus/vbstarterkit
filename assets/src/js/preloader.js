// Site preloader
window.onload = () => {
    const sitePreloader = document.querySelector('.preloader-container');
    
    setTimeout(() => {
        sitePreloader.style.display = 'none';
        document.body.style.overflowY =  'auto';
    }, 0); // 1000
}