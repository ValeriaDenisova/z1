/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.count = this.state.list.length + 1;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.count++, title: 'Новая запись', countSelections: 0, textSelections: '' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected === true){
            item.countSelections++;
            if ((item.countSelections % 100 === 12) || (item.countSelections % 100 === 13) || (item.countSelections % 100 === 14)){
              item.textSelections = ` | Выделяли ${item.countSelections} раз`;
            } else if ((item.countSelections % 10 === 2) || (item.countSelections % 10 === 3) || (item.countSelections % 10 === 4)){
              item.textSelections = ` | Выделяли ${item.countSelections} раза`;
            } else{
              item.textSelections = ` | Выделяли ${item.countSelections} раз`;
            }
        }
        }else if(item.selected === true){
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
