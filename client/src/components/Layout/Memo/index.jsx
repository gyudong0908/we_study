import * as React from 'react';
import { Stack, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import MemoList from './MemoList';
import MemoView from './MemoView';
import MemoCreate from './MemoCreate';
import MemoEdit from './MemoEdit';

export default function Memo({ closeMemo }) {
    const [state, setState] = React.useState('list');
    const [memos, setmemos] = React.useState([]);
    const [selectMemo, setSelectMemo] = React.useState({});

    function moveList() {
        setState('list');
    }
    function moveEdit(target) {
        setState('edit');
        setSelectMemo(target);
    }
    function moveCreate() {
        setState('create');
    }
    function moveView(target) {
        setState('view');
        setSelectMemo(target);
    }
    function deleteMemo(targetId) {
        axios.delete(`${import.meta.env.VITE_SERVER_ADDRESS}/memo?memoId=${targetId}`, { withCredentials: true }).then(() => {
            setmemos(memos.filter(memo => memo.id !== targetId));
        }).catch(err => {
            console.log(err);
        })
    }
    function createMemo(target) {
        axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/memo?`, target, { withCredentials: true }).then(response => {
            setmemos([...memos, response.data])
        }).catch(err => {
            console.log(err);
        })
    }
    function getMemos() {
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/memos?`, { withCredentials: true }).then(response => {
            setmemos(response.data);
        }).catch(err => {
            console.log(err);
        })
    }
    function editMemo(targetId, target) {
        axios.put(`${import.meta.env.VITE_SERVER_ADDRESS}/memo?memoId=${targetId}`, target, { withCredentials: true }).then(() => {
            setmemos(memos.map(memo => (memo.id == targetId ? { ...target, id: targetId, updateAt: new Date() } : memo)));
        }).catch(err => {
            console.log(err);
        })
    }

    React.useEffect(() => {
        getMemos();
    }, [])

    return (
        <Stack sx={{
            width: 456,
            height: 373,
            flexShrink: 0,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            bottom: 10,
            right: 10,
            background: '#b3e5fc',
            borderRadius: '10px',
            padding: '15px',
            zIndex: (theme) => theme.zIndex.drawer +1
        }}>
            <Stack sx={{display:'inline-block', textAlign:'right'}}>
                <CloseIcon sx={{
                    color:'black',
                    cursor: 'pointer',
                    '&:hover': { transform: 'scale(1.1)' },
                    }} onClick={closeMemo} />
            </Stack>
            

            {(state === 'list') &&
                (
                    <MemoList
                        memos={memos}
                        moveView={moveView}
                        moveCreate={moveCreate}
                        deleteMemo={deleteMemo}
                    />
                )

            }

            {(state === 'view') &&
                (
                    <MemoView
                        selectMemo={selectMemo}
                        moveList={moveList}
                        moveEdit={moveEdit}
                    />
                )

            }

            {(state === 'create') &&
                (
                    <MemoCreate
                        moveList={moveList}
                        createMemo={createMemo}
                    />
                )

            }

            {(state === 'edit') &&
                (
                    <MemoEdit
                        selectMemo={selectMemo}
                        moveList={moveList}
                        editMemo={editMemo}
                    />
                )

            }
        </Stack>
    );
};