// src/components/ProjectCard.test.jsx
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import ProjectCard from './ProjectCard.jsx';

test('renders the project title and description', () => {
  render(
    <ProjectCard
      title="Weather App"
      description="A React Native app that fetches live weather data."
      tags={["React Native"]}
    />
  );

  expect(screen.getByText('Weather App')).toBeInTheDocument();
  expect(screen.getByText(/fetches live weather data/)).toBeInTheDocument();
});

test('shows the Featured badge only when featured is true', () => {
  render(<ProjectCard title="Weather App" description="..." featured={true} />);
  expect(screen.getByText('Featured')).toBeInTheDocument();
});