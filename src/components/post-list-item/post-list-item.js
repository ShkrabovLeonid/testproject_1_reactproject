import React from 'react';

import './post-list-item.scss'

export default class PostListItem extends React.Component{

    state = {
        important: this.props.important,
        like: this.props.like
    }

    onImportant = ()=>{
        this.setState((state, props) => {
            return {
                important: !state.important
            };
        });
    };
    onLike = ()=>{
        this.setState((state, props) => {
            return {
                like: !state.like
            };
        });
    };

    render(){
        let classNames = 'app-list-item d-flex justify-content-between';
        if(this.state.important){
            classNames += ' important';
        }
        if (this.state.like) {
            classNames += ' like';
        }

        return(
            <div className={classNames}>
            <span 
            className="app-list-item-label"
            onClick={this.onLike}
            >
            {this.props.label}
            </span>
            <div className="d-flex justify-content-center align-items-center">
            <button 
            type="button" 
            className="btn-star btn-sm"
            onClick={this.onImportant}
            >
            <i className="fa fa-star"></i>
            </button>
            <button type="button" className="btn-trash btn-sm">
            <i className="fa fa-trash-o"></i>
            </button>
            <i className="fa fa-heart"></i>
            </div>
            </div>
        )
    }

}