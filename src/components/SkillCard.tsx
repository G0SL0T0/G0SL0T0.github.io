'use client';

interface SkillCardProps {
  title: string;
  description: string;
  progress: number;
  tooltip: string;
  icon: React.ReactNode;
}

export default function SkillCard({ title, description, progress, tooltip, icon }: SkillCardProps) {
  return (
    <div 
      className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative cursor-default group"
      data-tooltip={tooltip}
    >
      <div className="skill-icon mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="skill-progress h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="skill-progress-bar h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 scale-90 px-3 py-1.5 bg-black/80 text-white text-xs rounded-md whitespace-nowrap opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:scale-100">
        {tooltip}
      </div>
    </div>
  );
}