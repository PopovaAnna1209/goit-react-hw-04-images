import {  useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return alert('Please enter something :)');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

    return (
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.searchForm_button}>
            <span>
              <FiSearch size={25} stroke="#3f51b5" />
            </span>
          </button>

          <input
            className={css.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={searchQuery}
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
