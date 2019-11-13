import React, {Fragment, useRef, useState} from 'react';
import {ToDosList} from './ToDosList';
import {AddNewButton} from '../common/AddNewButton';
import {ToDoInput} from '../common/ToDoInput';
import {store} from '../../stores/RootStore';
import T from 'prop-types';
import {GroupPropTypes} from '../../propTypes/groupPropTypes';

export const ToDosLayout = ({group}) => {
    const [showInput, setShowInput] = useState(false);

    const inputEl = useRef();

    const onAddNewClick = () => {
        setShowInput(true);
    };

    const onAdd = (value) => {
        const todo = store.todos.add(value);

        if (group.type === 'predefined') {
            group.addTodo(todo);
            todo.toggleImportant();
        } else {
            group.addTodo(todo);
        }

        setShowInput(false);
    };

    return (
        <Fragment>
            <h3 className="groupName">{group.title}</h3>
            {
                JSON.parse(JSON.stringify(!group.todos.length))
                    ? null
                    : <ToDosList todos={group.todos}/>
            }
            {showInput && <ToDoInput onAdd={onAdd} placeholder='Add new todo...' ref={inputEl}/>}
            <AddNewButton onClick={onAddNewClick} text='Add todo'/>
        </Fragment>
    );
};

ToDosLayout.propTypes = {
    group: T.shape({...GroupPropTypes})
};