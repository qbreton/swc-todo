import * as styles from './Checklist.styled';

export function Checklist(props) {

    return (
        <styles.Container>
            <styles.Title>{ props.checklist.title }</styles.Title>
            <styles.ListWrapper>
            { props.checklist.items.map((item, index) => (
                <styles.ListItem key={index}>
                    <div>{ item.description }</div>
                    { item?.quantity && (
                    <div>{ item.quantity }</div>
                    )}
                </styles.ListItem>
            ))}
            </styles.ListWrapper>
        </styles.Container>
    );
}