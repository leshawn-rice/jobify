import { useContext, useState } from 'react';
import JoblyApi from './api';
import TextInput from './form-components/TextInput';
import './styles/Form.css';
import './styles/Search.css'
import UserContext from './UserContext';

const Search = ({ items, setItems }) => {
  const { user } = useContext(UserContext);

  const INITIAL_DATA = {
    search: ''
  }
  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(({
      ...formData,
      [name]: value
    }))
  }

  const updateItems = async () => {
    let newItems = await JoblyApi.searchCompanies(formData.search, user.token);
    setItems(newItems);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    updateItems()
    setFormData(INITIAL_DATA);
  }

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <TextInput name="search" label="Search" formData={formData} handleChange={handleChange} />
        <button className="Search-Btn">&#x1F50E;</button>
      </form>
    </div>
  )
}

export default Search;