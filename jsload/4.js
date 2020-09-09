function perflog(s, name) {
    const async = s.async ? " async" : "";
    const defer = s.defer ? " defer" : "";
    const src = s.src.replace(/^https?:\/\/[^\/]+/, "");
    performance.mark(`${src}${async}${defer}: ${name}`);
}
perflog(document.currentScript,'init(); // exec start');

// simple comment

function wait1(s){
    perflog(s,'setTimeout(0) // next event loop');
}
setTimeout(wait1, 0, document.currentScript);

!function wait1b(s){
    perflog(s,'!function() // bang function');
}(document.currentScript);

(async function wait1c(s){
    perflog(s,'(function(){}(()) // immediate execute');
})(document.currentScript);

perflog(document.currentScript,'done(); // exec done');
