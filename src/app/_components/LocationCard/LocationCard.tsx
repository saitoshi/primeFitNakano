'use client';
import './style.css';
import React from 'react';

export const LocationCard = () => {
  return (
    <>
      <dl className='locationCard'>
        <dt>店舗名</dt>
        <dd>Prime Fit 中野</dd>
        <dt>住所</dt>
        <dd>
          〒164-0001 東京都中野区中野２丁目１２−１２ オクト勧業ビル 401 オクト
        </dd>
        <dt>TEL</dt>
        <dd>03-6820-0380</dd>
        <dt>最寄り駅</dt>
        <dd>中野駅南口徒歩5分</dd>
      </dl>
    </>
  );
};
