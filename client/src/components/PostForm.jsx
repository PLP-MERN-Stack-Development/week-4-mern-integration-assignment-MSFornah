import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function PostForm({ editMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    if (editMode) {
      axios.get(`/api/posts/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error(err));
    }
  }, [editMode, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      axios.put(`/api/posts/${id}`, formData)
        .then(() => navigate(`/posts/${id}`))
        .catch(err => console.error(err));
    } else {
      axios.post('/api/posts', formData)
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Title"
        required
      />
      <textarea
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        placeholder="Content"
        required
      />
      <button type="submit">{editMode ? 'Update' : 'Create'} Post</button>
    </form>
  );
}