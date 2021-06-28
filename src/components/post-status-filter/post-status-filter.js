import React, {Component} from 'react';

import './post-status-filter.css'

export default class PostStatusFilter extends Component{

    buttons = [
        {name:'all', label:'Все'},
        {name:'like', label:'Понравилось'}
    ]

    render(){
        const buttons = this.buttons.map((buttons)=>{
            const active = this.props.filter === buttons.name;
            const clazz = active ? 'btn-info' : 'btn-outline-secondary';
            return(
                <button 
                    key={buttons.name} 
                    type='button' 
                    className={`btn ${clazz}`}
                    onClick={()=>{
                        this.props.onFilterSelect(buttons.name)
                    }}
                    >{buttons.label}</button>
            )
        })
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}
