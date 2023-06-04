import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import ButtonIndustry from './component/ButtonIndustry';
import { setTargetIndustryCategory } from './store/homeSlice';
import DetailContentIndustry from './component/DetailContentIndustry';
import NoteIcon from './component/icon/NoteIcon';
import TaskIcon from './component/icon/TaskIcon';
import ScrumboardIcon from './component/icon/ScrumboardIcon';
import EmailIcon from './component/icon/EmailIcon';
import ChatIcon from './component/icon/ChatIcon';
import AIServiceIcon from './component/icon/AIServiceIcon';

const Feature = () => {
  const targetIndustryCategory = useSelector(
    (state) => state.homePageNew.home.targetIndustryCategory
  );

  const dataIndustry = [
    {
      icon: <NoteIcon />,
      category: 'NOTE',
      description: 'Capture, organize, remember.',
      mainColor: '#0A4A03',
      background: 'bg-agriculture-content',
      imgBgColor: '#D3FCCF',
      content: {
        description:
          'The note feature is a versatile digital tool that allows users to quickly capture and organize their thoughts, ideas, and important information in a user-friendly text format, enhancing productivity and facilitating easy retrieval.',
        listMenu: [
          {
            id: 1,
            title: 'Text Capture',
            description: 'Capture and store textual information quickly and easily.',
            image: 'NoteDetail',
          },
          {
            id: 2,
            title: 'Formatting Tools',
            description: 'Format and style your notes for improved readability and organization.',
            image: 'NoteDetail',
          },
          {
            id: 3,
            title: 'Organization Options',
            description:
              'Organize notes into categories, folders, or tags for efficient management.',
            image: 'NoteDetail',
          },
          {
            id: 4,
            title: 'Sync Across Devices',
            description: 'Access and update your notes seamlessly across multiple devices.',
            image: 'NoteDetail',
          },
          {
            id: 5,
            title: 'Quick Search',
            description:
              'Easily find specific notes using search functionality for faster retrieval. ',
            image: 'NoteDetail',
          },
        ],
      },
    },
    {
      icon: <TaskIcon />,
      category: 'TASK',
      description: 'Efficiency unleashed through tasks.',
      mainColor: '#1D588B',
      background: 'bg-telecommunication-content',
      imgBgColor: '#CCE6FF',
      content: {
        description:
          'The task feature is a powerful tool that allows users to create, manage, and track their tasks and activities, helping them stay organized, prioritize their work, and increase productivity.',
        listMenu: [
          {
            id: 1,
            title: 'Task Creation',
            description: 'The algorithms automatically transform images into accurate 3D models.',
            image: 'TaskDetail',
          },
          {
            id: 2,
            title: 'Priority Setting',
            description:
              'Auto detect abnormal on tower structure and posture (inclined, missing of joinning parts, corrosion, and generate warning/recommendation for repaire/maintenant decision with level of risk.',
            image: 'TaskDetail',
          },
          {
            id: 3,
            title: 'Due Dates',
            description: 'Set deadlines for tasks to manage time effectively.',
            image: 'TaskDetail',
          },
          {
            id: 4,
            title: 'Progress Tracking',
            description: 'Monitor the progress of tasks to stay on top of your workload.',
            image: 'TaskDetail',
          },
          {
            id: 5,
            title: 'Task Collaboration',
            description:
              'Collaborate with others by assigning tasks, sharing updates, and coordinating efforts.',
            image: 'TaskDetail',
          },
        ],
      },
    },
    {
      icon: <ScrumboardIcon />,
      category: 'SCRUMBOARD',
      description: 'Visualize progress, conquer tasks.',
      mainColor: '#DCAC65',
      background: 'bg-construction-content',
      imgBgColor: '#FFF5CC',
      content: {
        description:
          'The scrumboard feature provides a visual and interactive platform for teams to track and manage their tasks, allowing them to collaborate effectively, monitor progress, and achieve project goals efficiently.',
        listMenu: [
          {
            id: 1,
            title: 'Visual Organization',
            description:
              'Arrange tasks and activities visually on a digital board for easy tracking and comprehension.',
            image: 'ScrumboardDetail',
          },
          {
            id: 2,
            title: 'Task Cards',
            description:
              'Create task cards with key details such as title, description, assignee, and status.',
            image: 'ScrumboardDetail',
          },
          {
            id: 3,
            title: 'Drag and Drop',
            description:
              'Easily move task cards across different columns or categories to reflect progress.',
            image: 'ScrumboardDetail',
          },
          {
            id: 4,
            title: 'Team Collaboration',
            description:
              'Enable teams to collaborate and update task status in real-time for effective teamwork.',
            image: 'ScrumboardDetail',
          },
          {
            id: 5,
            title: 'Agile Project Management',
            description:
              'Facilitate agile project management methodologies, such as Scrum or Kanban, with customizable board columns and workflow visualization.',
            image: 'ScrumboardDetail',
          },
        ],
      },
    },
    {
      icon: <EmailIcon />,
      category: 'MAIL',
      description: 'Stay connected, communicate seamlessly.',
      mainColor: '#0A4A03',
      background: 'bg-forestry-content',
      imgBgColor: '#D3FCCF',
      content: {
        description:
          'The mail feature enables users to send, receive, and manage electronic messages, facilitating efficient communication, information sharing, and collaboration across individuals and organizations.',
        listMenu: [
          {
            id: 1,
            title: 'Email Communication',
            description: 'Send and receive electronic messages for efficient communication.',
            image: 'EmailDetail',
          },
          {
            id: 2,
            title: 'Inbox Organization',
            description:
              'Manage and organize emails in folders, labels, or categories for easy access.',
            image: 'EmailDetail',
          },
          {
            id: 3,
            title: 'Attachment Support',
            description:
              'Attach files, documents, or media to emails for sharing and collaboration.',
            image: 'EmailDetail',
          },
          {
            id: 4,
            title: 'Filtering and Sorting',
            description:
              'Use filters and sorting options to manage and prioritize incoming emails.',
            image: 'EmailDetail',
          },
          {
            id: 5,
            title: 'Address Book Integration',
            description:
              'Access a centralized contact list for quick and easy recipient selection.',
            image: 'EmailDetail',
          },
        ],
      },
    },
    {
      icon: <ChatIcon />,
      category: 'CHAT',
      description: 'Connect, converse, collaborate.',
      mainColor: '#0A4A03',
      background: 'bg-agriculture-content',
      imgBgColor: '#D3FCCF',
      content: {
        description:
          'The chat feature enables real-time communication and collaboration between individuals or groups, fostering instant exchange of ideas, discussions, and effective teamwork.',
        listMenu: [
          {
            id: 1,
            title: 'Real-Time Communication',
            description: 'Engage in instant messaging for immediate and direct conversations.',
            image: 'ChatDetail',
          },
          {
            id: 2,
            title: 'Group Chat',
            description:
              'Create and participate in group conversations for collaborative discussions.',
            image: 'ChatDetail',
          },
          {
            id: 3,
            title: 'Multimedia Sharing',
            description:
              'Share files, images, videos, or links within the chat for seamless collaboration.',
            image: 'ChatDetail',
          },
          {
            id: 4,
            title: 'Emojis and Reactions',
            description: 'Express emotions and reactions using emojis or predefined reactions.',
            image: 'ChatDetail',
          },
          {
            id: 5,
            title: 'Message History',
            description: 'Access and review past chat conversations for reference and continuity.',
            image: 'ChatDetail',
          },
        ],
      },
    },
    {
      icon: <AIServiceIcon />,
      category: 'AI SERVICE',
      description: 'Intelligence amplified, possibilities expanded.',
      mainColor: '#1D588B',
      background: 'bg-telecommunication-content',
      imgBgColor: '#CCE6FF',
      content: {
        description:
          'The AI feature leverages advanced algorithms and machine learning to provide intelligent assistance, enabling users to automate tasks, gain insights, and access personalized recommendations for enhanced productivity and decision-making.',
        listMenu: [
          {
            id: 1,
            title: 'Intelligent Assistance',
            description:
              'Receive intelligent suggestions, recommendations, and insights to enhance productivity and decision-making.',
            image: 'AIDetail',
          },
          {
            id: 2,
            title: 'Natural Language Understanding',
            description:
              'Communicate with the AI using natural language, making interactions more intuitive and user-friendly.',
            image: 'AIDetail',
          },
          {
            id: 3,
            title: 'Personalization',
            description:
              'Adapt to user preferences and behaviors to provide tailored and personalized responses and recommendations.',
            image: 'AIDetail',
          },
          {
            id: 4,
            title: 'Automation',
            description:
              'Automate repetitive tasks and workflows through AI-powered algorithms, saving time and effort.',
            image: 'AIDetail',
          },
          {
            id: 5,
            title: 'Advanced Analytics',
            description:
              'Analyze large amounts of data and provide data-driven insights, enabling informed decision-making.',
            image: 'AIDetail',
          },
        ],
      },
    },
  ];

  useEffect(() => {
    dispatch(setTargetIndustryCategory(dataIndustry[0]));
  }, []);

  const dispatch = useDispatch();

  const handleClickItem = (item) => {
    if (item.category === targetIndustryCategory.category) return;
    dispatch(setTargetIndustryCategory(item));
  };

  const screenNonHd = useMediaQuery('(max-width:1366px)');
  return (
    <div
      style={{
        height: '100rem',
        width: '100%',
        paddingTop: '8rem',
        background:
          'linear-gradient(175.37deg, rgba(250, 255, 239, 0.06) 3.42%, rgba(250, 255, 239, 0.06) 3.43%, rgba(236, 254, 255, 0.06) 94.15%), #FBFDFF',
      }}
      id="industry"
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          left: '15rem',
          width: 'fit-content',
        }}
      >
        <div
          style={{ backgroundColor: '#0D3659', margin: 'auto 0', width: '7.2rem' }}
          className="w-44 border-2 h-0"
        />

        <p
          style={{
            fontSize: '3.6rem',
            fontWeight: '700',
            color: '#0D3659',
            marginLeft: '1rem',
          }}
        >
          FEATURES
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          position: 'relative',
          left: '15rem',
          paddingTop: '1rem',
          width: 'fit-content',
        }}
      >
        <p
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#0D3659',
          }}
        >
          WHAT WE’VE MADE
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          padding: screenNonHd ? '5rem 5rem 5rem 23rem' : '5rem 23rem 5rem 23rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {dataIndustry.map((item, index) => (
            <ButtonIndustry
              key={index}
              icon={item.icon}
              category={item.category}
              description={item.description}
              mainColor={item.mainColor}
              isActive={targetIndustryCategory.category === item.category}
              handleClickItem={() => handleClickItem(item)}
            />
          ))}
        </div>

        <DetailContentIndustry />
      </div>
    </div>
  );
};

export default Feature;
