import { useState } from 'react';
import * as styles from './Checklist.styled';
import * as dateFns from 'date-fns';

function mergeArraysByIndex(arr1, arr2) {
    const merged = arr1.reduce((result, obj) => {
        result[obj.index] = obj;
        return result;
    }, {});

    arr2.forEach((obj) => {
        if (!merged[obj.index]) {
            obj.checked = false;
            merged[obj.index] = obj;
        }
    });

    return Object.values(merged);
}

function loadEmptyList(date, type) {
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0];
    if (type === 'Daily') {
        return today.toISOString().split('T')[0] < today;
    } else if (type === 'Weekly') {
        const startDate = new Date(date);
        const endOfWeek = dateFns.format(dateFns.endOfWeek(startDate, {weekStartsOn: 1}), 'yyyy-MM-dd');
        return todayDate > endOfWeek;
    } else if (type === 'Monthly') {
        const startDate = new Date(date);
        const endOfMonth = dateFns.format(dateFns.endOfMonth(startDate), 'yyyy-MM-dd');
        return todayDate > endOfMonth;
    }
}

export function Checklist({ checklist }) {
    let localStored = JSON.parse(localStorage.getItem(checklist.title.toLowerCase()));
    let initial = [];
    if (!localStored || !localStored.date || loadEmptyList(localStored.date, checklist.title)) {
        initial = initState(checklist);
    } else {
        initial = localStored.state;
    }
    initial = mergeArraysByIndex(initial, checklist.items);
    const [listState, setListState] = useState(initial);

    function initState(list) {
        return list.items.map((item) => ({
            ...item,
            checked: false
        }));
    }

    function setStateLocalStorage(state) {
        setListState(state);
        localStorage.setItem(checklist.title.toLowerCase(), JSON.stringify({
            "date": new Date().toISOString().split('T')[0],
            "state": state
        }))
    }
    
    function checkItem(index) {
        let state = [...listState];
        const updatedState = state.map((item) => {
            if (item.index === index) {
                return {
                    ...item,
                    checked: !item.checked
                };
            }
            return item;
        });
        setStateLocalStorage(updatedState);
    }


    return (
        <styles.Container>
            <styles.Title>{ checklist.title }</styles.Title>
            <styles.ListWrapper>
            {listState.map((item) => (
                <styles.ListItem key={item.index} onClick={() => checkItem(item.index)}>
                    <styles.Checkbox
                        type='checkbox'
                        checked={item.checked}
                        onChange={() => {}}
                    />                   
                    <styles.ItemsRight className={item.checked ? 'checked' : ''}>
                        <styles.ItemDescription>{item.description}</styles.ItemDescription>
                        {item?.quantity && (
                            <styles.ItemQuantity>{item.quantity}</styles.ItemQuantity>
                        )}
                    </styles.ItemsRight>
                </styles.ListItem>
            ))}
            </styles.ListWrapper>
        </styles.Container>
    );
}