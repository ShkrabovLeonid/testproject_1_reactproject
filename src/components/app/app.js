import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

export default class App extends React.Component {
    state = {
        data: [
            {id:1, label:'Going to lealrn React', important: false, like: true},
            {id:2, label:'That is so good', important: true},
            {id:3, label:'I need a break...', important: false}
        ]
    }

    deleteItem = (id)=>{
        this.setState((state, props) => {
            const index = state.data.findIndex(elem => {
                return elem.id === id;
            })
            const before = state.data.slice(0,index);
            const after = state.data.slice(index + 1);
            const newArrData = [...before, ...after];
            return {
                data: newArrData
            }
          });
    }
    addItem = (body)=>{
        const newItem = {
            label:body,
            important:false,
            id: new Date().getMilliseconds()
        };
        this.setState((state, props) => {
            const newArrData = [...state.data, newItem];
            return {
                data: newArrData
            }
        });
    }

    render(){
        return (
            <div className="app">
            <AppHeader/>
            <div className="search-panel d-flex">
                <SearchPanel/>
                <PostStatusFilter/>
            </div>
            <PostList
            posts={this.state.data}
            onDelete={this.deleteItem}
            />
            <PostAddForm
            onAdd={this.addItem}
            />
            </div>
        )
    }
}