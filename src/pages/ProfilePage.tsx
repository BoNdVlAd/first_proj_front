import React, { useState } from 'react'
import Header from '../components/Header'
import { useAuth } from './AuthProvider'
import { styled } from 'styled-components'
import MakeTwoFactorAuth from '../components/MakeTwoFactorAuth'
import APIWrapper from '../API/APIWrapper'
import ButtonBack from '../components/ButtonBack'
import ChangePassword from '../components/ChangePassword'

const ProfilePage = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const { user } = useAuth()
    const [showTwoFactorAuth, setShowTwoFactorAuth] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editedName, setEditedName] = useState<string>(user?.name || '')
    const [editedEmail, setEditedEmail] = useState<string>(user?.email || '')
    const api = APIWrapper()

    React.useEffect(() => {
        if (user) {
            setEditedName(user.name)
            setEditedEmail(user.email)
        }
    }, [user])

    const handleAddAuthorization = () => {
        setShowTwoFactorAuth(!showTwoFactorAuth)
    }

    const deleteAuthorization = async () => {
        await api.remove('delete-2fa-code')
        window.location.reload()
    }

    const toggleEditMode = () => {
        setIsEditing(!isEditing)
    }

    const handleSave = async () => {
        const body = {
            name: editedName,
            email: editedEmail,
        }
        await api.patch('users/update', body)
        setIsEditing(false)
        // window.location.reload()
    }

    return (
        <>
            <Container>
                <Header search={searchValue} setSearch={setSearchValue} />
                <Wrapper>
                    <ButtonBack />
                    <UserWrapper>
                        {isEditing ? (
                            <>
                                <Label>
                                    User name:
                                    <Input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) =>
                                            setEditedName(e.target.value)
                                        }
                                    />
                                </Label>
                                <Label>
                                    User email:
                                    <Input
                                        type="email"
                                        value={editedEmail}
                                        onChange={(e) =>
                                            setEditedEmail(e.target.value)
                                        }
                                    />
                                </Label>
                                <ButtonGroup>
                                    <SaveButton onClick={handleSave}>
                                        Save
                                    </SaveButton>
                                    <CancelButton onClick={toggleEditMode}>
                                        Cancel
                                    </CancelButton>
                                </ButtonGroup>
                            </>
                        ) : (
                            <>
                                <Text>
                                    User name: {editedName || user?.name}
                                </Text>
                                <Text>
                                    User email: {editedEmail || user?.email}
                                </Text>
                                <EditButton onClick={toggleEditMode}>
                                    Edit
                                </EditButton>
                            </>
                        )}
                        <ChangePassword />
                        <h2>Two Factor Authorization</h2>
                        <TwoFactorAuthBlock>
                            {user?.google2fa_secret ? (
                                <RemoveButton onClick={deleteAuthorization}>
                                    Remove two-factor authorization
                                </RemoveButton>
                            ) : (
                                <AddButton onClick={handleAddAuthorization}>
                                    Add two-factor authorization
                                </AddButton>
                            )}
                            {showTwoFactorAuth && <MakeTwoFactorAuth />}
                        </TwoFactorAuthBlock>
                    </UserWrapper>
                </Wrapper>
            </Container>
        </>
    )
}

export default ProfilePage

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    font-family: 'Arial', sans-serif;
`

const Wrapper = styled.div`
    padding: 4rem 2rem;
    background-color: #ffffff;
    flex: 1;
    border-radius: 20px;
    margin: 2rem auto;
    width: 80%;
    position: relative;
`

const UserWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    background-color: #d6d6d6;
    padding: 2rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
`

const Text = styled.p`
    color: #333;
    font-size: 16px;
    margin-bottom: 1rem;
`

const Label = styled.label`
    font-size: 16px;
    color: #555;
    margin-bottom: 0.5rem;
    display: block;
    width: 100%;
`

const Input = styled.input`
    width: calc(100% - 20px);
    padding: 10px;
    margin-top: 0.5rem;
    border-radius: 10px;
    border: 1px solid #ddd;
    font-size: 16px;
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.1);
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #00aaff;
    }
`

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 1.5rem;
`

const Button = styled.button`
    border-radius: 20px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition:
        background-color 0.3s ease,
        box-shadow 0.3s ease;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

    &:hover {
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    }
`

const SaveButton = styled(Button)`
    background-color: #4caf50;
    color: #fff;

    &:hover {
        background-color: #45a049;
    }
`

const CancelButton = styled(Button)`
    background-color: #f44336;
    color: #fff;

    &:hover {
        background-color: #e53935;
    }
`

const EditButton = styled(Button)`
    background-color: #ff9800;
    color: #fff;
    margin-top: 1rem;

    &:hover {
        background-color: #fb8c00;
    }
`

const RemoveButton = styled(Button)`
    background-color: #f44336;
    color: #fff;

    &:hover {
        background-color: #e53935;
    }
`

const AddButton = styled(Button)`
    background-color: #4caf50;
    color: #fff;

    &:hover {
        background-color: #45a049;
    }
`

const TwoFactorAuthBlock = styled.div`
    margin-top: 2rem;
    width: 100%;
    text-align: center;
`
