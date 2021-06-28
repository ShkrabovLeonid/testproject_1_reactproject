//Подключаем библиотеку React
import React from 'react';

//Подключаем компоненты
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

//Подключаем общие стили
import './app.css';

//Создаем главный класс App
export default class App extends React.Component {
    //Обьект состояний
    state = {
        data: [
            {id:1, label:'Going to lealrn React', important: false, like: true},
            {id:2, label:'That is so good', important: true, like:false},
            {id:3, label:'I need a break...', important: false}
        ],
        term: '',
        filter: 'all' //по умолчанию показать все посты
    }

    //Удаляет елемент с data
    deleteItem = (id)=>{
        //Обновляем state
        this.setState((state, props) => {
            //Находим в data совпадение по переданому id
            const index = state.data.findIndex(elem => {
                return elem.id === id;
            })
            //Создаем копию обьекта data до полученого индекса
            const before = state.data.slice(0,index);
            //Создаем копию обьекта data после полученого индекса
            const after = state.data.slice(index + 1);
            //Обьеденяем два полученых массива в один
            const newArrData = [...before, ...after];
            return {
                //Записывает в data state новый массив
                data: newArrData
            }
          });
    }
    //Добавляет новый елемент в data
    addItem = (body)=>{
        //Создаем новый елемент
        const newItem = {
            //Указываем значения обьекта
            //body получаем с value
            label:body,
            important:false,
            like:false,
            //Генерируем id нового елемента с даты в секундах
            id: new Date().getTime()
        };
        //Обновляем state
        this.setState((state, props) => {
            //Создаем новый массив и записываем созданный елемент в конец массива
            const newArrData = [...state.data, newItem];
            return {
                //Записывает в data state новый массив
                data: newArrData
            }
        });
    }

    //Общая функция для обновления состояния Important и Like
    onToggleName = (id, name) =>{
        //Обновляем state
        this.setState((state, props) => {
            //Находим в data совпадение по переданому id
            const index = state.data.findIndex(elem => elem.id === id);
            
            //Получаем елемент на котором произошло событие
            const old = state.data[index];
            //Создаем новый елемент с измененым значением Important или Like
            const newItem = {...old, [name]: !old[name]};

            //Создаем копию обьекта data до полученого индекса
            const before = state.data.slice(0,index);
            //Создаем копию обьекта data после полученого индекса
            const after = state.data.slice(index + 1);
            //Добавляем новосозданный елемент между before и after
            const newArrData = [...before, newItem, ...after];
            return {
                //Записывает в data state новый массив
                data: newArrData
            }
        });
    }
    //Функция для обновления состояния Important
    onToggleImportant = (id)=>{
        //Вызов функции для Important
        this.onToggleName(id, 'important');
    };
    //Функция для обновления состояния Like
    onToggleLike = (id)=>{
        //Вызов функции для Like
        this.onToggleName(id, 'like');
    };

    //Функция поиска постов
    searchPosts = (items, term)=>{
        //Проверяем что в data есть елементы
        if(items.length === 0){
            return;
        }

        //Перебираем каждый елемент и ищем совпадение с тем что указоно в value (term) в нижнем регистре
        return items.filter(item=>{
            return item.label.toLowerCase().indexOf(term) > -1;
        })
    };
    
    //Функция фильтра постов
    filterPosts = (items, filter)=>{
        switch (filter) {
            case 'like':
                //Если name у кнопки like то вернем елементы
                items = items.filter(item=>item.like)
                break;
            case 'all':
                //Если name у кнопки all то вернем все елементы
                break;
            default:
                break;
        }
        //Возвращаем елементы после цикла switch
        return items;
    };

    //Обновляем state поиск из полученных от пользователя действий
    onUpdateSearch = (term)=>{
        this.setState({
            term: term
        })
    }

    //Обновляем state фильтр из полученных от пользователя действий
    onFilterSelect = (filter)=>{
        this.setState({
            filter: filter
        })
    }

    render(){
        //Проверяем сколько лайкнутых публикаций в data
        const liked = this.state.data.filter((item) =>{
            return item.like === true;
        }).length;
        //Проверяем сколько всего публикаций в data
        const allPosts = this.state.data.length;

        //Получаем публикации
        //Сначала выполняем поиск по публикациям, а потом фильтрацию
        const visiblePosts = this.filterPosts(this.searchPosts(this.state.data, this.state.term), this.state.filter);
        return (
            //Выводим на страницу
            <div className="app">
            <AppHeader 
            liked={liked}
            allPosts={allPosts}
            />
            <div className="search-panel d-flex">
                <SearchPanel
                onUpdateSearch={this.onUpdateSearch}
                />
                <PostStatusFilter
                filter={this.state.filter}
                onFilterSelect={this.onFilterSelect}
                />
            </div>
            <PostList
            posts={visiblePosts}
            onDelete={this.deleteItem}
            onToggleImportant={this.onToggleImportant}
            onToggleLike={this.onToggleLike}
            />
            <PostAddForm
            onAdd={this.addItem}
            />
            </div>
        )
    }
}