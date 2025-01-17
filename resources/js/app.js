import Alpine from 'alpinejs';
import Typewriter from 'typewriter-effect/dist/core';
import AOS from 'aos';
import {Fancybox} from "@fancyapps/ui/src/Fancybox";
import {Panzoom} from "@fancyapps/ui/src/Panzoom";
import {Controls} from "@fancyapps/ui/src/Panzoom/plugins/Controls/Controls";
import Swal from 'sweetalert2/src/sweetalert2';
import {annotate} from 'rough-notation';

window.Alpine = Alpine;
window.Swal = Swal

document.addEventListener('alpine:init', () => {
    const panzoom = new Panzoom(document.getElementsByClassName("panzoom")[0], {
        Controls: {
            l10n: {
                ZOOMIN: "Zoom in",
                ZOOMOUT: "Zoom out",
            },

            buttons: ["zoomIn", "zoomOut"],
            tpl: {
                zoomIn:
                    '<svg tabindex="-1" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V20M20 12L4 12" /></svg>',
                zoomOut:
                    '<svg tabindex="-1" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 12H4" /></svg>',
            },
        }
    });
    panzoom.zoomIn(0.5);
    const panzoomControls = new Controls(panzoom);
    panzoomControls.createContainer()


    Fancybox.bind('a[data-fancybox]', {
        dragToClose: false,

        Toolbar: false,
        closeButton: "top",

        Image: {
            zoom: false,
        },
        Carousel: {
            'friction': 0.8
        },

        on: {
            initCarousel: (fancybox) => {
                const slide = fancybox.Carousel.slides[fancybox.Carousel.page];
            },
            "Carousel.change": (fancybox, carousel, to, from) => {
                const slide = carousel.slides[to];
            },
        },
    });

    AOS.init({});
    Alpine.data('typewriter', ($el) => ({
        init: function () {
            const t = new Typewriter($el, {
                strings: ['Full-stack web developer', 'open-source evangelist', 'web designer', 'SEO expert', 'security expert', 'entrepreneur'],
                delay: 75,
                skipAddStyles: true,
                autoStart: true,
                loop: true
            });
        }
    }))
    Alpine.data('loading', ($el) => ({
        show: true,
        init: function () {
            this.show = false;
        }
    }))
    Alpine.data('highlight', () => ({
        show: function () {
            this.$nextTick(() => {
                annotate(this.$refs['el1'], {type: 'underline'}).show();
                annotate(this.$refs['el2'], {type: 'box', color: 'red'}).show();
                annotate(this.$refs['el3'], {type: 'highlight', color: 'yellow'}).show();
            })
        }
    }));
    Alpine.data('scrollToTop', () => ({
        visibleScrollToTop: false,
        init: function () {
            window.addEventListener("scroll", () => {
                if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
                    this.visibleScrollToTop = true;
                } else {
                    this.visibleScrollToTop = false;
                }
            })
        },
        clickTop: function () {
            document.body.scrollTop = 0; // For Safari
            document.location.hash = "";
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
    }));
})

function getCoords(elem) { // cross browser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {top: Math.round(top), left: Math.round(left)};
}

window.scrollSpy = function () {

}
window.highlight = function (element) {
    const type = element.dataset['type'] || "underline"
    annotate(element, {type});
}
Alpine.start();
