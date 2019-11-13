import React from 'react';
import Checkbox from '../common/Checkbox';
import Icon from '../common/Icon';
import {observer} from 'mobx-react';
import {store} from '../../stores/RootStore';
import {ToDoPropTypes} from '../../propTypes/toDoPropTypes';
import T from 'prop-types';

const ToDoItem = ({todo}) => {
    const onChange = () => {
        todo.toggleCompleted();
    };

    const onStarClick = () => {
        todo.toggleImportant();

        const importantList = store.groups.list.find(group => group.type === 'predefined');

        if (todo.isImportant) {
            importantList.addTodo(todo);
        } else {
            importantList.removeTodo(todo);
        }
    };

    return !!todo && (
        <li className='toDoItem'>
            <Checkbox todo={todo} onChange={onChange}/>
            <div className={todo.isCompleted ? 'isCompleted' : null}>
                {todo.text}
            </div>
            <Icon name='star' size='18px'
                  color={todo.isImportant ? '#3e69e4' : '#ccc'}
                  onClick={onStarClick}
            />
        </li>
    );
};
ToDoItem.propTypes = {
    todo: T.shape({...ToDoPropTypes})
};

export default observer(ToDoItem);