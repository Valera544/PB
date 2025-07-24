
import React from 'react';
import { AppStep } from './types';

export const STEPS = [
  AppStep.DefinePurpose,
  AppStep.AuditEquity,
  AppStep.ConstructNarrative,
  AppStep.EmbodyBrand,
  AppStep.CommunicateStory,
  AppStep.SocializeBrand,
  AppStep.Reevaluate,
];

export const Logo = () => (
  <div className="flex items-center space-x-2">
    <svg width="40" height="40" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M51 102C79.1665 102 102 79.1665 102 51C102 22.8335 79.1665 0 51 0C22.8335 0 0 22.8335 0 51C0 79.1665 22.8335 102 51 102Z" fill="#84C481"/>
      <path d="M51.0002 89.25C72.102 89.25 89.2502 72.1018 89.2502 51C89.2502 29.8982 72.102 12.75 51.0002 12.75C29.8984 12.75 12.7502 29.8982 12.7502 51C12.7502 72.1018 29.8984 89.25 51.0002 89.25Z" fill="#A4D1A2"/>
      <path d="M51 76.5C65.0868 76.5 76.5 65.0868 76.5 51C76.5 36.9132 65.0868 25.5 51 25.5C36.9132 25.5 25.5 36.9132 25.5 51C25.5 65.0868 36.9132 76.5 51 76.5Z" fill="#F0FDF4"/>
      <path d="M47.2834 53.6667C47.2834 53.6667 47.9918 51.9375 50.1168 51.9375C53.6668 51.9375 54.7168 47.4125 51.1668 46.1917C51.1668 46.1917 52.5752 49.3875 50.1168 50.9417C47.9918 52.4958 45.8668 52.1417 45.8668 52.1417C45.8668 52.1417 46.5752 52.85 47.2834 53.6667Z" fill="#84C481"/>
      <path d="M62.2418 53.6667C62.2418 53.6667 62.9501 51.9375 60.8251 51.9375C57.2751 51.9375 56.2251 47.4125 59.7751 46.1917C59.7751 46.1917 58.3668 49.3875 60.8251 50.9417C62.9501 52.4958 65.0751 52.1417 65.0751 52.1417C65.0751 52.1417 64.3668 52.85 63.6585 53.6667C63.2202 54.1627 62.7483 54.0848 62.2418 53.6667Z" fill="#519E4E"/>
      <path d="M51.0002 65.1958C51.0002 65.1958 48.1627 63.4667 48.1627 60.45C48.1627 55.4917 53.2327 54.2708 54.9627 57.6417C54.9627 57.6417 52.1252 56.2333 51.0002 58.25C49.8752 60.2667 50.2293 62.5687 50.2293 62.5687C50.2293 62.5687 50.646 64.444 51.0002 65.1958Z" fill="#519E4E"/>
    </svg>
    <div className="flex flex-col -space-y-1">
      <span className="text-sm font-light text-slate-500">Institute of</span>
      <span className="text-lg font-bold tracking-tight text-brand-text">PRODUCT LEADERSHIP</span>
    </div>
  </div>
);
