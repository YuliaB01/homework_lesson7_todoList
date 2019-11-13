import {types as t} from 'mobx-state-tree';
import {ToDoListModel} from './ToDoStore';
import {GroupListModel} from './GroupStore';
import uuid from 'uuid/v4';

export const RootStore = t
    .model('RootStore', {
        todos: t.optional(ToDoListModel, {}),
        groups: t.optional(GroupListModel, {})
    });

export const store = RootStore.create({
    groups: {
        list: [
            {
                id: uuid(),
                title: 'Important',
                type: 'predefined',
                isSelected: true
            }
        ]
    }
});
