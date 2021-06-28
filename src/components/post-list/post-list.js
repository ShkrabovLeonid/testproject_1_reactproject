import React from 'react'

import './post-list.css'

import PostListItem from '../post-list-item'

const PostList = (props) =>{
    
    const elementsPosts = props.posts.map((item) =>{
        // const {id, ...itemProps} = item;
        return(
            <li key={item.id} className='list-group-item'>
                <PostListItem
                label={item.label}
                important={item.important}
                like={item.like}
                onDelete={() => props.onDelete(item.id) }
                onToggleImportant={() => props.onToggleImportant(item.id)}
                onToggleLike={() => props.onToggleLike(item.id)}
                />
            </li>
            // <li key={id} className='list-group-item'>
            //     <PostListItem {...itemProps}/>
            // </li>
        );
    });

    return (
        <ul className="app-list list-groupe">
            {elementsPosts}
        </ul>
    )
}

export default PostList;