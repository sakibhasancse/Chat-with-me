import React from 'react';
import * as S from './Tag.styles';
export const Tag = ({ title, color, bgColor, removeTag, ...otherProps }) => {
  const style = {
    color: color || 'var(--white)',
    backgroundColor: bgColor ? `var(--${bgColor}-color)` : 'var(--orange)',
  };
  return (
    <S.TagWrapper style={style} {...otherProps}>
      #{title}
      {!!removeTag && (
        <S.RemoveTagWrapper
          onClick={(e) => {
            removeTag();
            e.stopPropagation();
          }}
        >
          <S.RemoveTagIcon />
        </S.RemoveTagWrapper>
      )}
    </S.TagWrapper>
  );
};