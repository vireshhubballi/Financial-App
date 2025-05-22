import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Table, Alert } from 'react-bootstrap';
import { financialService } from '../utils/financialService';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    month: '',
    priority: 'Medium',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetching budgets from the API
  const fetchBudgets = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Make sure your JWT token is stored here
      const res = await financialService.getBudget(token);
      const data = res.data;
      if (Array.isArray(data)) {
        setBudgets(data);
      } else if (data) {
        setBudgets([data]);
      } else {
        setBudgets([]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load budgets');
    }
  };
  

  useEffect(() => {
    fetchBudgets();
  }, []); // Empty array means this runs once when the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await financialService.updateBudget(formData);
      setSuccess('Budget saved successfully!');
      setError('');
      setFormData({
        category: '',
        amount: '',
        description: '',
        month: '',
        priority: 'Medium',
      });
      fetchBudgets(); // Fetch budgets again after updating
    } catch (err) {
      console.error(err);
      setError('Failed to save budget');
      setSuccess('');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Manage Budget</h2>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="mb-4">
        {/* Form Inputs */}
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Food, Rent"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="e.g., 1000"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., groceries for April"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Month</Form.Label>
          <Form.Control
            type="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Priority</Form.Label>
          <Form.Select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit">Save Budget</Button>
      </Form>

      <h3>Budget List</h3>
      {Array.isArray(budgets) && budgets.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Month</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((b, index) => (
              <tr key={index}>
                <td>{b.category}</td>
                <td>{b.amount}</td>
                <td>{b.description}</td>
                <td>{b.month}</td>
                <td>{b.priority}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No budget items yet.</p>
      )}
    </Container>
  );
};

export default Budget;
