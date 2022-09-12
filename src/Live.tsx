import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, onValue } from 'firebase/database';
import { Triangle, Square, Circle } from 'phosphor-react';

const parseMarkdownSimple = (md) => {
  return md
    .replace(/(\b\*\*(.*?)\*\*\b)/g, '<strong>$2</strong>')
    .replace(/(\b_(.*?)_\b)/g, '<em>$2</em>')
    .replace(/(`(.*?)`)/g, '<pre>$2</pre>')
    .replace(/(\[(.*?)]\((.*?)\))/g, '<a href="$3">$2</a>')
    .replace(/(\^\^(.*?)\^\^)/g, '<ins>$2</ins>');
};

const Card = styled.div`
  --shadow-color: 0deg 0% 55%;
  align-items: center;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0.1px 0.2px 0.2px hsl(var(--shadow-color) / 0.51),
    0.3px 0.6px 0.7px -1px hsl(var(--shadow-color) / 0.46),
    0.7px 1.6px 1.8px -2px hsl(var(--shadow-color) / 0.42),
    1.8px 4px 4.6px -3px hsl(var(--shadow-color) / 0.37);
  border: 0;
  font-size: 48px;
  font-weight: inherit;
  text-align: left;
  padding: 16px;
  width: 100%;
  word-break: break-word;
  white-space: pre-wrap;

  &::before {
    content: '“';
    font-size: 56px;
    line-height: 1;
    font-family: 'Anonymous Pro', monospace;
    // subtle blue
    color: #afb9f1;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Map = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  grid-gap: 12px;
  padding: 24px 24px 68px;
  box-sizing: border-box;
  align-items: start;
`;

const Column = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  grid-gap: 8px;
  align-items: start;
`;

const Legend = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, max-content));
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 18px 0 24px;
  grid-gap: 24px;
  border-top: 1px solid #000;
  background: #fff;
  font-size: 24px;
`;

const LegendItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  grid-gap: 24px;
`;

const Live = () => {
  const [ideas, setIdeas] = useState([]);
  const app = initializeApp({
    databaseURL: 'https://move-to-the-center.firebaseio.com',
  });

  useEffect(() => {
    const db = getDatabase(app);
    const reference = ref(db, 'ideas');
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      setIdeas(Object.keys(data).map((key) => ({ ...data[key], id: key })));
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [ideas]);

  const columns = [[], [], [], [], []];
  ideas
    // sort by createdAt date
    .sort((a, b) => {
      // @ts-ignore
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    .forEach((idea, index) => {
      columns[index % 5].push(idea);
    });

  return (
    <>
      <Map>
        {columns.map((col, i) => (
          <Column key={`column-${i}}`}>
            {col.map((idea) => (
              <Card key={idea.id}>
                <p dangerouslySetInnerHTML={{ __html: parseMarkdownSimple(idea.content) }} />
                <Row>
                  {idea.type === 'talking' && (
                    <Triangle weight="fill" color={'#F71735'} size={24} />
                  )}
                  {idea.type === 'seeking' && <Circle weight="fill" color={'#FF9F1C'} size={24} />}
                  {idea.type === 'knowing' && <Square weight="fill" color={'#45CB85'} size={24} />}
                </Row>
              </Card>
            ))}
          </Column>
        ))}
      </Map>
      <Legend>
        <LegendItem>
          <Triangle weight="fill" color={'#F71735'} size={24} />
          <span>What are people talking about, excited about, and stressing about?</span>
        </LegendItem>
        <LegendItem>
          <Circle weight="fill" color={'#FF9F1C'} size={24} />
          <span>Why are people seeking and avoiding God and the church?</span>
        </LegendItem>
        <LegendItem>
          <Square weight="fill" color={'#45CB85'} size={24} />
          <span>What do you want to know more about God and the Bible?</span>
        </LegendItem>
      </Legend>
    </>
  );
};

export default Live;
