import * as $ from 'jquery';

import { Cat } from '@/javascript/cat.js';

import '@/styles/style.scss';

import CatImage from '@img/cat.jpg';

import json from '@/assets/myjson.json';

console.log('JSON:', json);
$('pre').addClass('code').html(JSON.stringify(json, null, 2));

const cat = new Cat(CatImage);

const container = document.querySelector('.content-container');

cat.render(container);
