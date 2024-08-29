import React from 'react'
import { styled } from 'styled-components'
import debounce from 'lodash.debounce'

interface SearchProps {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Search: React.FC<SearchProps> = ({ search, setSearch }: SearchProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [value, setValue] = React.useState<string>('')
    const onInputRequest = React.useCallback(
        debounce((e: any) => {
            setSearch(e.target.value)
        }, 500),
        []
    )

    const onClickClear = () => {
        inputRef.current && inputRef.current.focus()
        setSearch('')
        setValue('')
    }

    const onInputChange = (e: any) => {
        setValue(e.target.value)
        onInputRequest(e)
    }

    return (
        <>
            <Wrapper>
                <SearchInput
                    ref={inputRef}
                    value={value}
                    onChange={(e) => onInputChange(e)}
                />
                {value && <RemoveButton onClick={onClickClear}>x</RemoveButton>}
            </Wrapper>
        </>
    )
}

export default Search

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: -50px;
    width: 150px;
    position: relative;
`

const SearchInput = styled.input`
    width: 100%;
    height: 30px;
    border-radius: 20px;
    border: none;
    outline: none;
    padding: 0 10px;
    font-size: 14px;
`

const RemoveButton = styled.div`
    position: absolute;
    right: 1rem;
    cursor: pointer;
    top: 0.4rem;
`
