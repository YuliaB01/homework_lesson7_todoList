import {types as t} from 'mobx-state-tree';
import {ToDoModel} from './ToDoStore';
import uuid from 'uuid/v4';

export const GroupModel = t
    .model('GroupModel', {
        id: t.string,
        title: t.string,
        type: 'user-defined',
        todos: t.array(t.reference(ToDoModel)),
        isSelected: t.optional(t.boolean, false)
    })
    .actions(store => ({
        addTodo(todo) {
            store.todos.push(todo);
        },
        removeTodo(todo) {
            store.todos = store.todos.filter(_todo => _todo.id !== todo.id);
        },
    }));

export const GroupListModel = t
    .model('GroupListModel', {
        list: t.array(GroupModel)
    })
    .views(store => ({
        get selectedGroup() {
            return store.list.filter(group => group.isSelected);
        }
    }))
    .actions(store => ({
        addGroup(title) {
            const group = {
                id: uuid(),
                title
            };

            store.list.push(group);

            return group;
        },
        toggleSelected(group) {
            store.list.forEach(_group => {
                _group.isSelected = group.id === _group.id;
            });
        }
    }));