// src/components/Timeline.tsx
interface TimelineItem {
  year: string;
  title: string;
  description: string;
  skills: string[];
  projects?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="timeline-grid">
      {items.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-card">
            <div className="timeline-date">{item.year}</div>
            <h3 className="timeline-title">{item.title}</h3>
            <p className="timeline-desc">{item.description}</p>
            <div className="timeline-skills">
              {item.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;