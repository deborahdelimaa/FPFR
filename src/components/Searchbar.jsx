import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import projectService from '../services/product.service';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const categories = ['Other', 'Vehicles', 'Technology', 'Furniture', 'Sport', 'Animals'];

function Searchbar() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const handleSearch = (e) => setSearch(e.target.value);
  const handleFilter = (e) => setFilter(e.target.value);

  // axios.post {search, filter}

  return (
    <section>
      <form>
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={handleSearch}
        />

        <select
          name="filter"
          id="filter"
          onChange={handleFilter}
          value={filter}
        >
          {categories.map((filters) => {
            return <option value={filters}>{filters}</option>;
          })}
        </select>
      </form>
    </section>
  );
}

export default Searchbar;
