import 'typeface-bitter'
import 'typeface-open-sans'

import { wrapRootElement as wrap } from './wrap-root-element'

export const wrapRootElement = wrap

export const onRouteUpdate = ({ location, prevLocation }) => {
    if (location.pathname.indexOf('/docs/') === 0) {
        clearTimeout(window.notyfTimeout);
        window.notyfTimeout =  setTimeout("openN()", 15 * 1000);
    }
    
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function (e) {
            if (e.currentTarget.href.indexOf("/docs/spec") !== -1 ||
                e.currentTarget.href.indexOf("/feed") !== -1 ||
                e.currentTarget.href.indexOf("/docs/api/client-server") !== -1 ||
                e.currentTarget.href.indexOf("matrix.org/code") !== -1) {
                    window.location = e.currentTarget.href;
                    return false;
                }
        }
    }
}



