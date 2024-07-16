import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function ColorEditForm() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [color, setColor] = useState({
    name: "",
    is_favorite: false,
  });

  const handleTextChange = (event) => {
    setColor({ ...color, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setColor({ ...color, is_favorite: !color.is_favorite });
  };

  // Update a color. Redirect to show view
  const updateColor = () => {
    fetch(`${API}/colors/${id}`, {
      method: "PUT",
      body: JSON.stringify(color),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(navigate(`/colors/${id}`))
      .catch(err => console.log(err))
  };

const handleSubmit = (event) => {
    event.preventDefault();
    updateColor();
  };

   // On page load, fill in the form with the color data.

   useEffect(() => {
    fetch(`${API}/colors/${id}`)
      .then(res => res.json())
      .then(res => setColor(res))
      .catch(err => console.log(err))
   }, [])

  return (
    <div className="Edit">
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
      <Link to={`/colors/${id}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default ColorEditForm;
