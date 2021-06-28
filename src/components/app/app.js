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
            {id:2, label:'That is so good', important: true, like:false},
            {id:3, label:'I need a break...', important: false}
        ],
        term: '',
        filter: 'all'
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
            id: new Date().getTime()
        };
        this.setState((state, props) => {
            const newArrData = [...state.data, newItem];
            return {
                data: newArrData
            }
        });
    }

    onToggleName = (id, name) =>{
        this.setState((state, props) => {
            const index = state.data.findIndex(elem => elem.id === id);
            
            const old = state.data[index];
            const newItem = {...old, [name]: !old[name]};

            const before = state.data.slice(0,index);
            const after = state.data.slice(index + 1);
            const newArrData = [...before, newItem, ...after];
            return {
                data: newArrData
            }
        });
    }

    onToggleImportant = (id)=>{
        this.onToggleName(id, 'important');
    };
    onToggleLike = (id)=>{
        this.onToggleName(id, 'like');
    };

    searchPosts = (items, term)=>{
        if(items.length === 0){
            return;
        }

        return items.filter(item=>{
            return item.label.toLowerCase().indexOf(term) > -1;
        })
    };
    
    filterPosts = (items, filter)=>{
        switch (filter) {
            case 'like':
                items = items.filter(item=>item.like)
                break;
            case 'all':
                break;
            default:
                break;
        }
        return items;
    };

    onUpdateSearch = (term)=>{
        this.setState({
            term: term
        })
    }

    onFilterSelect = (filter)=>{
        this.setState({
            filter: filter
        })
    }

    render(){
        const liked = this.state.data.filter((item) =>{
            return item.like === true;
        }).length;
        const allPosts = this.state.data.length;

        const visiblePosts = this.filterPosts(this.searchPosts(this.state.data, this.state.term), this.state.filter);
        return (
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