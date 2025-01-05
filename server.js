const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

app.use(cors());
app.use(express.json());

// Basic routes for testing
app.get('/', (req, res) => {
  res.send('CEO Express Backend is running!');
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    return res.json({ user: data.user });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

app.post('/api/register', async (req, res) => {
  const { email, password, fullName, businessName } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          business_name: businessName
        }
      }
    });
    if (error) return res.status(400).json({ message: error.message });
    return res.json({ user: data.user });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar conta' });
  }
});

app.post('/api/logout', async (req, res) => {
  try {
    await supabase.auth.signOut();
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error during logout' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
