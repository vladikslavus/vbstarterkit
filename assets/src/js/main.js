// Webpack entry point

// preloader
import './preloader.js';

// import bootstrap from "bootstrap"; // import Bootstrap 5.0.0-beta2
const bootstrap = require('bootstrap');
[...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map((tooltipTriggerEl) => {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Swiper
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay]);


import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript'; // import js highlighting
hljs.registerLanguage('javascript', javascript); // import xml highlighting
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('xml', xml);
hljs.highlightAll();

import 'fslightbox'; // image gallary Fullscreen Lightbox

import 'simplebar';  // custom scroll

// implement wow.js library to trigger animate.css
import WOW from 'wow.js';
new WOW().init();

// Hide/show navbar
import { smartNavbar } from "./vblib/smartnavbar";

import { getScrollbarWidth } from "./vblib/getscrollbarwidth"; // get real scrollbar width for our code
const scrollbarWidth = getScrollbarWidth();

import { magicModals } from "./vblib/magicmodals";

// Smooth Scrolling
import { smoothScroll } from "./vblib/smoothscroll";

// chart.js
import Chart from 'chart.js';
import charSortBytData from "./vblib/sortchart";

// Flip countdown timer
import { FlipDown } from './vblib/flip-down.js';

// Babel testing
import './tests.js';