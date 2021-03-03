import * as $ from 'jquery';

function importAll(resolve) {
    resolve.keys().forEach(resolve);
}

importAll(require.context('@/', true, /\.js$|\.scss$/));

import json from '@/assets/myjson.json';

console.log('JSON:', json);
$('pre').addClass('code').html(JSON.stringify(json, null, 2));
