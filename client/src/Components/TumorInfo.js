// client/src/Components/TumorInfo.js
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  border: 2px solid ${({ theme }) => theme.primary};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const Content = styled.div`
  color: ${({ theme }) => theme.text};
  margin-top: 20px;
  line-height: 1.8;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h4`
  color: ${({ theme }) => theme.primary};
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TumorTypeCard = styled.div`
  background: ${({ theme }) => theme.bgLight || '#1C1E27'};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border-left: 4px solid ${({ color }) => color || '#854CE6'};
`;

const TumorTypeName = styled.h5`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  margin: 0 0 8px 0;
  font-weight: 600;
`;

const TumorTypeDesc = styled.p`
  color: ${({ theme }) => theme.textSoft || '#b1b2b3'};
  font-size: 14px;
  margin: 0;
  line-height: 1.6;
`;

const IntroText = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 20px;
  padding: 15px;
  background: ${({ theme }) => theme.bgLight || '#1C1E27'};
  border-radius: 8px;
  border-left: 4px solid #4CAF50;
`;

const TumorInfo = () => {
  const [showInfo, setShowInfo] = useState(false);

  const tumorTypes = [
    {
      name: 'Gliomas',
      description: 'The most common type of primary brain tumor, originating from glial cells that support brain cells. Can range from slow-growing (low-grade) to aggressive (high-grade).',
      color: '#FF6B6B'
    },
    {
      name: 'Astrocytomas',
      description: 'Form in star-shaped glial cells called astrocytes. Can be low-grade (slow-growing) or high-grade (fast-growing). Glioblastomas are the most aggressive form.',
      color: '#FF8C42'
    },
    {
      name: 'Oligodendrogliomas',
      description: 'Develop from oligodendrocytes, cells that produce myelin (insulation for nerve fibers). Usually slow-growing and respond well to treatment.',
      color: '#FFA07A'
    },
    {
      name: 'Ependymomas',
      description: 'Form in ependymal cells that line the ventricles (fluid-filled spaces) of the brain and spinal cord. Can occur at any age but are more common in children.',
      color: '#FFD93D'
    },
    {
      name: 'Meningiomas',
      description: 'The most common type of primary brain tumor overall. They form in the meninges, the protective layers covering the brain and spinal cord. Usually benign (90%), but some can be malignant.',
      color: '#6BCF7F'
    },
    {
      name: 'Pituitary Tumors',
      description: 'Usually benign tumors that form in the pituitary gland at the base of the brain. Can affect hormone production and cause various symptoms. Often treated with medication or surgery.',
      color: '#4D96FF'
    },
    {
      name: 'Pineal Region Tumors',
      description: 'Develop in or around the pineal gland, located deep in the center of the brain. This gland produces melatonin. These tumors are rare and can affect sleep patterns.',
      color: '#9D84B7'
    },
    {
      name: 'Chordomas',
      description: 'Rare tumors that occur in the bones at the base of the skull and spine. Slow-growing but can be difficult to treat due to their location near critical structures.',
      color: '#C77DFF'
    }
  ];

  return (
    <Container>
      <Header onClick={() => setShowInfo(!showInfo)}>
        <Title>
          🧠 About Brain Tumor Types
        </Title>
        <ToggleButton>
          {showInfo ? '▼ Hide Info' : '▶ Learn More'}
        </ToggleButton>
      </Header>

      <Content show={showInfo}>
        <IntroText>
          <strong>What are Brain Tumors?</strong><br />
          Brain tumors are classified as <strong>primary</strong> (originating in the brain) or <strong>secondary</strong> (spreading from elsewhere in the body). 
          They can be <strong>benign</strong> (non-cancerous) or <strong>malignant</strong> (cancerous). 
          Primary brain tumors are named for the type of cell or location where they start.
        </IntroText>

        <Section>
          <SectionTitle>📋 Primary Brain Tumor Types</SectionTitle>
          <p style={{ color: '#b1b2b3', fontSize: '14px', marginBottom: '20px' }}>
            These tumors originate within brain tissue and are named for the type of cell they develop from:
          </p>

          {tumorTypes.map((tumor, index) => (
            <TumorTypeCard key={index} color={tumor.color}>
              <TumorTypeName>{tumor.name}</TumorTypeName>
              <TumorTypeDesc>{tumor.description}</TumorTypeDesc>
            </TumorTypeCard>
          ))}
        </Section>

        <Section style={{ 
          background: 'rgba(255, 152, 0, 0.1)', 
          padding: '15px', 
          borderRadius: '8px',
          borderLeft: '4px solid #FF9800'
        }}>
          <SectionTitle style={{ color: '#FF9800' }}>⚠️ Important Note</SectionTitle>
          <p style={{ color: '#b1b2b3', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
            This AI system provides preliminary analysis only. <strong>Accurate tumor type classification 
            requires biopsy and pathological examination by qualified medical professionals.</strong> Always 
            consult with neurologists, neurosurgeons, and oncologists for proper diagnosis and treatment planning.
          </p>
        </Section>
      </Content>
    </Container>
  );
};

export default TumorInfo;