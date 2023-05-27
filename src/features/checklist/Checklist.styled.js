import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin: 0 auto;
`

export const Title = styled.h2`
    font-size: 10vw;
    margin-top: 0;
    margin-bottom: 4vh;
    @media screen and (min-width: 720px) {
        font-size: 2em;
    }
`

export const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 90%;
    @media screen and (min-width: 720px) {
        width: 100%;
    }
`

export const ListItem = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 20px;
    padding: 2vh 5vw;
    box-sizing: border-box;
    background-color: #521330;
    &:not(:last-child) {
        margin-bottom: 3vh;
    }
    .checked {
        text-decoration: line-through;
    }
    @media screen and (min-width: 720px) {
        width: 100%;
        padding: 2vh 2vw;
    }
`

export const ItemsRight = styled.div`
    display: flex;
    flex-direction: column;
`

export const ItemDescription = styled.div`
    font-size: 6vw;
    font-weight: 500;
    @media screen and (min-width: 720px) {
        font-size: 1.2em;
    }
`

export const ItemQuantity = styled.div`
    font-size: 5vw;
    color: rgb(186 186 186);
    @media screen and (min-width: 720px) {
        font-size: 1em;
    }
`

export const Checkbox = styled.input`
    display: grid;
    place-content: center;
    appearance: none;
    margin: 0;
    margin-right: 5vw;
    font: inherit;
    color: currentColor;
    width: 6vw;
    height: 6vw;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    &::before {
        background: white;
        content: "";
        width: 4vw;
        height: 4vw;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--form-control-color);
    }
    &:checked::before {
        transform: scale(1);
    }
    @media screen and (min-width: 720px) {
        width: 1.5vw;
        height: 1.5vw;
        margin-right: 1vw;
        &::before {
            width: .8vw;
            height: .8vw;
        }
    }
`