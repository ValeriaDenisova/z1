import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: 1, title: 'Название элемента', countSelections: 0, textSelections: '' },
    { code: 2, title: 'Некий объект', countSelections: 0, textSelections: '' },
    { code: 3, title: 'Заголовок', countSelections: 0, textSelections: ''},
    { code: 4, title: 'Очень длинное название элемента из семи слов', countSelections: 0, textSelections: ''},
    { code: 5, title: 'Запись', countSelections: 0, textSelections: ''},
    { code: 6, title: 'Шестая запись', countSelections: 0, textSelections: ''},
    { code: 7, title: 'Седьмая запись', countSelections: 0, textSelections: ''},
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
