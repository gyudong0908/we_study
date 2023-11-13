import { Stack } from '@mui/material';
import { useState } from 'react';

import { useLoaderData } from 'react-router-dom';
import ClassCard from '../components/ClassCard';
import ClassTabs from '../components/ClassTabs';
import { useSelector } from 'react-redux';
export function classPageLoader({ params }) {
  const { classId } = params;

  const title = '265기 Node.js 기반 DevOps 개발자 양성과정';
  const section = '이창현 강사';
  const curriculums = [
    {
      title: 'Node.js',
      content: (
        <ul style={{ listStylePosition: 'inside' }}>
          <li>A</li>
          <li>B</li>
          <li>C</li>
        </ul>
      ),
    },
    {
      title: 'React',
      content: (
        <ul style={{ listStylePosition: 'inside' }}>
          <li>A</li>
          <li>B</li>
          <li>C</li>
        </ul>
      ),
    },
  ];
  const notices = [
    {
      title: '팀 프로젝트 안내',
      content: `1. 프로젝트 : Nodejs 기반 웹서비스 제작하기 
      2. 종류 : 팀 프로젝트
      
      3. 내용
      - 팀별로 프로젝트를 진행한다.
      - 팀별 회의를 통해 제작할 주제를 정하고 전체 로드맵을 구성한다.
      - 각 팀원별로 업무를 상세하게 분배한다.
      - 이슈 트래킹 도구를 사용하여 작업 진행 상황을 팀원들끼리 공유하고, 이슈 및 일정 등을 조정해나간다.
      - 과정 코드 및 완성된 산출물은 Github에 게시하고 업데이트 한다.
      
      4. 프로젝트 기획서 제출 및 발표
      - 11월 8일 수요일까지 업로드
      - 11월 9일 목요일 발표
      
      5. 프로젝트 구현 제출 및 발표 (상황에 따라 변동 가능)
      - 12월 7일 목요일까지 업로드
      - 12월 8일 금요일 발표
      
      팀프로젝트 편성
      
      1팀 - 양우진(PM), 최혜린, 이동규,  조정석
      2팀 - 이수현(PM), 김기성, 김기욱, 서의영
      3팀 - 황영조(PM), 이성운, 김수빈, 김미소`,
    },
  ];
  const assignments = [
    {
      title: '나의 프로필 페이지를 만들어보자.',
      content: `1. 메뉴는 홈, 나의소개, 연락처, 포트폴리오 링크 총 4개로 한다.
      2. 홈 페이지에서는 나를 나타낼 수 있는 대문사진 1개 배치한다.
      3. 나의 소개에는 나에 관하여 자유롭게 기술 및 이미지 활용을 한다.
      4. 연락처에는 나의 전화번호, 이메일, SNS 등의 내용을 배치한다.
      5. 포트폴리오에는 github 페이지 링크를 하고, 가능하면 포트폴리오마다 캡쳐 이미지 등을 활용한다. 
      
      Tip :  UI는 부트스트랩과 같은 라이브러리 사용을 권장.
      `,
    },
  ];
  const curriculumTopics = ['Node.js', 'React','MySQL'];

  return { title, section, curriculums, notices, assignments, curriculumTopics };
}

export default function ClassPage() {
  const [isTeacher, setIsTeacher] = useState(true);
  const { title, section, curriculums, notices, assignments, curriculumTopics } = useLoaderData();

  return (
    <Stack
      sx={{
        direction: 'column',
        spacing: '10px',
        marginTop: '100px',
        marginLeft: '270px',
        marginRight: '70px'
      }}
    >
      <ClassCard title={title} section={section} />
      <ClassTabs
        isTeacher={isTeacher}
        curriculums={curriculums}
        notices={notices}
        assignments={assignments}
        curriculumTopics={curriculumTopics}
      />
    </Stack>
  );
}
