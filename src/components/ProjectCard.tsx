// src/components/ProjectCard.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/button';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  detailsUrl?: string;
  metrics?: Array<{ icon: string; text: string }>;
}

export default function ProjectCard({ 
  title, 
  description, 
  image, 
  demoUrl, 
  detailsUrl,
  metrics = []
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40">
            <Image 
              src={image} 
              alt={title} 
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        
        {metrics.length > 0 && (
          <ul className="flex flex-wrap gap-3 mb-6">
            {metrics.map((metric, index) => (
              <li key={index} className="flex items-center gap-2 text-blue-600 text-sm">
                <i className={metric.icon}></i>
                <span>{metric.text}</span>
              </li>
            ))}
          </ul>
        )}
        
        <div className="flex flex-wrap gap-3">
          {demoUrl && (
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href={demoUrl}>Попробовать демо</Link>
            </Button>
          )}
          {detailsUrl && (
            <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              <Link href={detailsUrl}>Все кейсы</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}