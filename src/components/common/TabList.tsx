import React from 'react';
import useArticles from '../../context/articles';
import { ITab } from '../../reducers/articleList';

type TabsListProps = {
  data: ITab[];
};

export default function TabList({ data }: TabsListProps) {
  const {
    state: { selectedTab },
    dispatch,
  } = useArticles();

  const tabs = data.map((tab) => (
    <Tab
      key={tab.type}
      isSelected={selectedTab.type === tab.type}
      onClick={() => dispatch({ type: 'SET_TAB', tab })}
    >
      {tab.label}
    </Tab>
  ));

  if (selectedTab.type === 'TAG') {
    tabs.push(
      <Tab key={selectedTab.type} isSelected={true} onClick={() => {}}>
        #{selectedTab.label}
      </Tab>,
    );
  }

  return <ul className="nav nav-pills outline-active">{tabs}</ul>;
}

type TabProps = {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function Tab({ isSelected, onClick, children }: TabProps) {
  const classNames = ['nav-link'];
  if (isSelected) {
    classNames.push('active');
  }
  return (
    <li className="nav-item">
      <button className={classNames.join(' ')} onClick={onClick}>
        {children}
      </button>
    </li>
  );
}
