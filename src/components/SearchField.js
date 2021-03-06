import React, { useState, useEffect, useRef } from 'react';
import '../scss/searchfield.scss';
import scrollIntoView from 'scroll-into-view-if-needed';

const SearchField = ({ options = [], onChange = () => {}, placeholder = 'Search...' }) => {
  const [opened, setOpened] = useState(false);
  const container = useRef(null);
  // amit a user beir
  const [searchTerm, setSearchTerm] = useState('');
  // amit a user kiválaszt
  const [selectedItem, setSelectedItem] = useState('');
  const [searchResults, setSearchResults] = useState(options);
  const [cursorIndex, setCursorIndex] = useState(-1);

  const handleOutsideClick = (event) => {
    if (!container.current?.contains(event.target)) {
      setCursorIndex(-1);
      setOpened(false);
    }
  };

  useEffect(() => {
    onChange(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    setSearchResults(options);
  }, [options]);

  function handleInput(input) {
    setSearchTerm(input);
    setSelectedItem(input);
    setOpened(false);
  }

  useEffect(() => {
    const selected = searchResults.find((term) => term === searchTerm);
    if (selected) {
      setSelectedItem(selected);
    } else {
      setSelectedItem('');
      setSearchTerm('');
    }
  }, [opened]);

  useEffect(() => {
    if (cursorIndex === -1) return;
    const el = document.querySelector('.search-field .hover');
    if (el) {
      // el.scrollIntoViewIfNeeded();
      scrollIntoView(el, {
        scrollMode: 'if-needed',
        block: 'end'
      });
    }
  }, [cursorIndex]);

  useEffect(() => {
    if (opened) {
      const results = options.filter((option) => option.includes(searchTerm.toLowerCase()));
      setSearchResults(results);
    }
  }, [searchTerm, options]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      console.log('dropdown unmounted');
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  function handleKeyEvents(e) {
    if (e.key === 'Enter') {
      const hovered = document.querySelector('.search-field .hover');
      if (hovered) {
        handleInput(hovered.textContent);
        return;
      }
      const result = findFirst(e.target.value);
      if (result) {
        handleInput(result);
      }
    }
    if (e.key == 'ArrowDown') {
      setOpened(true);
      setCursorIndex(cursorIndex < searchResults.length - 1 ? cursorIndex + 1 : cursorIndex);
    }
    if (e.key == 'ArrowUp') {
      setOpened(true);
      setCursorIndex(cursorIndex > 0 ? cursorIndex - 1 : cursorIndex);
    }
  }

  function findFirst(term) {
    if (term.length < 1) return '';
    const result = options.find((option) => option.startsWith(term.toLowerCase()));
    return result || '';
  }

  return (
    <div className={opened ? 'search-field' : 'search-field rounded'} ref={container}>
      <span className='search-icon' />
      <input className='input-mask' value={findFirst(searchTerm)} disabled />
      <input
        className='input-real'
        placeholder={placeholder}
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          setOpened(true);
        }}
        onClick={() => {
          setOpened(!opened);
        }}
        onKeyDown={handleKeyEvents}
      />
      {opened && (
        <div className='options'>
          {searchResults.map((option, index) => (
            <button
              key={option}
              className={`option ${index === cursorIndex ? 'hover' : ''}`}
              onClick={() => {
                handleInput(option);
              }}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchField;
