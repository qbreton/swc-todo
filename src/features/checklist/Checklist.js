import { useState } from 'react';
import * as styles from './Checklist.styled';

function loadEmptyList(date, type) {
    const today = new Date();
    if (type === 'Daily') {
        return today.toISOString().split('T')[0] < today;
    } else if (type === 'Weekly') {
        const startDate = new Date(date);
        const startOfWeek = new Date(startDate);
        startOfWeek.setDate(startDate.getDate() - startDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return today >= startOfWeek && today <= endOfWeek;
    } else if (type === 'Monthly') {
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const givenYear = parseInt(date.slice(0, 4));
        const givenMonth = parseInt(date.slice(5, 7)) - 1;
        return currentYear > givenYear || (currentYear === givenYear && currentMonth > givenMonth);
    }
}

export function Checklist({ checklist }) {
    let localStored = JSON.parse(localStorage.getItem(checklist.title.toLowerCase()));
    let initial = [];
    console.log(checklist.title, loadEmptyList(localStored.date, checklist.title));
    if (!localStored || loadEmptyList(localStored.date, checklist.title)) {
        initial = initState(checklist);
    } else {
        initial = localStored.state;
    }
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