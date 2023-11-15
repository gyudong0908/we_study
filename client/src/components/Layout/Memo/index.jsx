import * as React from 'react';
import { Stack, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateMemo from './CreateMemo';
import MemoList from './MemoList';
import MemoListItem from './MemoListItem';

export default function Memo({closeMemo}){
    const memos=[
        {id:1, title: '1강 1차시 수업(11/5)', content: '1.State란 무엇인가', date:'2023.11.5.'},
        {id:2, title: '1강 2차시 수업(11/6)', content: '1.State란 무엇인가', date:'2023.11.6.'},
        {id:3, title: '1강 3차시 수업(11/7)', content: '1.State란 무엇인가', date:'2023.11.7.'},
    ];

    const [selectedMemoId, setSelectedMemoId] = React.useState('');
    const [isCreateMemoVisible, setCreateMemoVisible] = React.useState(false);

    function onClickHandler(id) {
        setSelectedMemoId(id);
    };
    function rewind(){
        setSelectedMemoId('');
    };
    const handleCreateMemoClick = () => {
        setCreateMemoVisible(true);
        setSelectedMemoId(''); // Close selected memo if open
    };
    const handleSaveClick = () => {
        setCreateMemoVisible(false);
      };

    return(
        <Stack sx={{
            width: 456,
            height: 373,
            flexShrink:0,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            bottom: 0,
            right: 0,
            background: '#b3e5fc',
            borderRadius:'20px',
          }}>
            <Stack>
            <Stack sx={{textAlign:'right', display:'inline-block'}}>
                <CloseIcon onClick={closeMemo} sx={{
                    cursor:'pointer',
                    margin:'10px',
                    color:'black',
                    '&:hover':{transform:'scale(1.1)'},
                }} />
            </Stack>
                {selectedMemoId !== '' ? (
                    <MemoListItem memo={memos.find(memo => memo.id === selectedMemoId)} rewind={rewind} />
                  ) : isCreateMemoVisible ? (
                    <CreateMemo />
                  ) : (
                    <MemoList memos={memos} onClickHandler={onClickHandler} />
                  )}
            </Stack>
            <Button variant='outlined' sx={{
                    width:'88%',
                    margin:'20px 30px',
                    padding:'10px 30px',
                    flexShrink:0,
                    borderRadius:'20px',
                    height:35,
                    position:'absolute',
                    bottom:0,
                }} onClick={isCreateMemoVisible ? handleSaveClick : handleCreateMemoClick}>
                {isCreateMemoVisible ? '저장' : '새 메모 만들기'}
            </Button>
            
        </Stack>
    );
};