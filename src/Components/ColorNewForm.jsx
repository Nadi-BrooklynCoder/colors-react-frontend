import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function ColorNewForm() {
  const navigate = useNavigate();
  const [color, setColor] = useState({
    name: "",
    is_favorite: false,
  });

  // Add a color. Redirect to the index view.
  const addColor = () => {
    fetch(`${API}/colors`, {
      method: "POST",
      body: JSON.stringify(color),
      headers: {
        "Content-Type": "application/json"
      }})
          .then(res => res.json())
          .then(navigate('/colors'))
          .catch(err => console.log(err))
  };

  const handleTextChange = (event) => {
    setColor({ ...color, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setColor({ ...color, is_favorite: !color.is_favorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addColor();
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={color.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Color"
          required
        />

        <label htmlFor="is_favorite">Favorite:</label>
        <input
          id="is_favorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={color.is_favorite}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <Link to={`/colors`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default ColorNewForm;
