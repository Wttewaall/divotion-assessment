'use client';

import React, { memo } from 'react';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  classes?: string;
  isActive: boolean;
  onClick: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ classes, isActive, onClick }) => {
  return (
    <Button variant="outline" className={`m-0 ${classes}`} onClick={onClick} aria-label="favorite button">
      <Heart fill={isActive ? '#ff4000' : '#ffffff'} stroke={isActive ? '#7a2306' : '#09090b'} />
    </Button>
  );
};

export default memo(FavoriteButton);
