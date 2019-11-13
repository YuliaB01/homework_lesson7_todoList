import React from 'react';
import GroupItem from './GroupItem';
import {observer} from 'mobx-react';
import {values} from 'mobx';
import T from 'prop-types';
import {GroupPropTypes} from '../../propTypes/groupPropTypes';

const GroupsList = ({groups}) => {
    return (
        <ul className='groupsList'>
            {values(groups).map(group =>
                <GroupItem key={group.id} {...{group}} />
            )}
        </ul>
    );
};

GroupsList.propTypes = {
    groups: T.arrayOf(T.shape({...GroupPropTypes}))
};

export default observer(GroupsList);