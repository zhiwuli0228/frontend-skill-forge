import { Row, Col } from 'antd';

import type { SkillItem } from '../data/skill-mock-data';
import { SkillCard } from './SkillCard';

interface SkillGridProps {
  skills: SkillItem[];
  onCardClick: (skill: SkillItem) => void;
}

export function SkillGrid({ skills, onCardClick }: SkillGridProps) {
  return (
    <Row gutter={[16, 16]} data-testid="skill-grid">
      {skills.map((skill) => (
        <Col span={6} key={skill.id}>
          <SkillCard
            skill={skill}
            onClick={() => onCardClick(skill)}
          />
        </Col>
      ))}
    </Row>
  );
}
