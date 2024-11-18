import { useState,useEffect } from 'react';
const Events=({ onSubmit, initialData })=>{
    const [name,setName]=useState('');
    const [description,setdescription]=useState('');
    const [date,setDate]=useState('');
    const [venue,setVenue]=useState('');
    useEffect(() => {
        if (initialData) {
          setName(initialData.title);
          setdescription(initialData.description);
          setDate(initialData.date);
          setVenue(initialData.location);
        }
      }, [initialData]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        onSubmit({name,description,date,venue})
        setName('');
    setdescription('');
    setDate('');
    setVenue('');    }
    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    );
  };
export default Events;