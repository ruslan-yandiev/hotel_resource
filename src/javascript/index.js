import * as $ from 'jquery';

function importAll(resolve) {
    resolve.keys().forEach(resolve);
}
// TODO Напоминалка! нет смысла подключать все scss and JS файлы в один так как мы и так их пропарсим и соберем
// TODO не касается области видимости переменных как в js так и в scss (импортировать для удаленной работы с перменными)
importAll(require.context('@/', true, /\.js$|\.scss$/));

import json from '@/assets/myjson.json';

console.log('JSON:', json);
$('pre').addClass('code').html(JSON.stringify(json, null, 2));
