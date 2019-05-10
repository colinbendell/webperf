// sw.js
const cacheName = 'test-cloudinary-cache';
const files = [
    './index.html',
    'https://res.cloudinary.com/tamas-demo/image/upload/w_250,h_250,c_thumb,r_max,g_face,f_auto/jam/darthvader.png',
    'https://res.cloudinary.com/tamas-demo/image/upload/w_250,h_250,c_thumb,r_max,g_face/jam/hansolo.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(files))
    );
});

self.addEventListener('fetch', event => {
    console.log('[SW] Fetching:', event.request);
    console.log(navigator.userAgent);
    event.respondWith(
        caches.match(event.request)
            .catch(e => console.log(e))
            .then(response => {
                console.log(response);
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});