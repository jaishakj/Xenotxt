
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../store/ForumStore';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.id}`} 
      className="block w-full bg-card border border-muted/30 rounded-md p-4 mb-4 neon-hover transition-all duration-300 pixel-corners"
    >
      <div className="flex items-center">
        <div className="text-4xl mr-4">
          <span>{category.icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-sm md:text-base font-pixel text-primary secondary-neon-text">{category.name}</h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">{category.description}</p>
        </div>
        <div className="text-xs md:text-sm font-pixel text-muted-foreground">
          <span>{category.threadCount}</span>
          <span className="ml-1 text-xs">THREADS</span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
