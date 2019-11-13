import {types as t} from 'mobx-state-tree';
import uuid from 'uuid/v4';

export const ToDoModel = t
    .model('ToDoModel', {
        id: t.identifier,
        text: t.string,
        isCompleted: t.optional(t.boolean, false),
        isImportant: t.optional(t.boolean, false)
    })
    .actions((store) => ({
        toggleCompleted() {
            store.isCompleted = !store.isCompleted;
        },
        toggleImportant() {
            store.isImportant = !store.isImportant;
        }
    }));

export const ToDoListModel = t
    .model('ToDoListModel', {
        list: t.array(ToDoModel)
    })
    .actions(store => ({
        add(text) {
            const todo = ToDoModel.create({
                id: uuid(),
                text
            });

            store.list.unshift(todo);

            return todo;
        }
    }));
