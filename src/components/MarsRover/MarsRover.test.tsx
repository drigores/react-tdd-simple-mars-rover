import React from 'react';
import { render, screen } from '@testing-library/react';
import MarsRover from './MarsRover';

test('shouldRender_MarsRoverComponent', () => {
  render(<MarsRover commands=''/>);
  const linkElement = screen.getByText("MarsRover");
  expect(linkElement).toBeInTheDocument();
});

test('shouldMarsRover_Receivingcommands', () => {
  const commands= "MMMR";
  render(<MarsRover commands={commands} />);
  const linkElement = screen.getByText(commands);
  expect(linkElement).toBeInTheDocument();
});

test('shouldMarsRover_ReceivingEntryPoint', () => {
  const entryPoint= "0:5:N";
  render(<MarsRover entryPoint={entryPoint} commands='' />);
  const linkElement = screen.getByText(entryPoint);
  expect(linkElement).toBeInTheDocument();
});

test('shouldMarsRover_ReceivingEntryPointWithDefaultValue', () => {
  const defaultValue= "0:0:N";
  render(<MarsRover commands=''/>);
  const linkElement = screen.getByText(defaultValue);
  expect(linkElement).toBeInTheDocument();
});


test('shouldMarsRover_Move', () => {
  const defaultValue= "0:0:N";
  const commands = "M";
  const expectedOutput = "0:1:N";
  render(<MarsRover commands={commands} entryPoint={defaultValue}  />);
  const linkElement = screen.getByText(expectedOutput);
  expect(linkElement).toBeInTheDocument();
});

test('shouldMarsRover_ChangeDirectionToRight', () => {
  const commands = "R";
  const expectedOutput = "0:0:E";
  render(<MarsRover commands={commands}  />);
  const linkElement = screen.getByText(expectedOutput);
  expect(linkElement).toBeInTheDocument();
});
test('shouldMarsRover_ChangeDirectionToLeft', () => {
  const commands = "L";
  const expectedOutput = "0:0:W";
  render(<MarsRover commands={commands}  />);
  const linkElement = screen.getByText(expectedOutput);
  expect(linkElement).toBeInTheDocument();
});

test('shouldMarsRover_ChangeMultipleMovecommandss', () => {
  const commands = "MMM";
  const expectedOutput = "0:3:N";
  render(<MarsRover commands={commands}  />);
  const linkElement = screen.getByText(expectedOutput);
  expect(linkElement).toBeInTheDocument();
});

test('shouldMarsRover_ChangeMultipleDirectionToLeftcommandss', () => {
  const commandsRight = "RR";
  const expectedOutputRight = "0:0:S";
  render(<MarsRover commands={commandsRight}  />);
  const linkElement = screen.getByText(expectedOutputRight);
  expect(linkElement).toBeInTheDocument();
  
});

test('shouldMarsRover_ChangeMultipleDirectionRightcommandss', () => {
  const commandsLeft = "LL";
  const expectedOutputLeft = "0:0:S";
  render(<MarsRover commands={commandsLeft}  />);
  const linkElement = screen.getByText(expectedOutputLeft);
  expect(linkElement).toBeInTheDocument();
});

test('shouldMarsRover_ChangeMultipleMovesAndDirectioncommandss', () => {
  const commands = "MMRMMLM";
  const expectedOutput = "2:3:N";
  render(<MarsRover commands={commands} />);
  const linkElement = screen.getByText(expectedOutput);
  expect(linkElement).toBeInTheDocument();
});


test('shouldMarsRover_WrapArround', () => {
  const commands = "MMMMMMMMMM";
  const expectedOutput = "0:0:N";
  render(<MarsRover commands={commands} />);
  const linkElement = screen.getByText(expectedOutput);
  expect(linkElement).toBeInTheDocument();
});

