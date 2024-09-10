import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPA_BASE_URL || '',
  process.env.REACT_APP_SUPA_BASE_KEY || ''
);

const app = express();
const PORT = process.env.REACT_APP_PORT_SUPA_BASE || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para obtener datos de la tabla "departamento"
app.get('/api/departamento', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('departamento').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ruta para obtener datos de la tabla "enfermedades"
app.get('/api/enfermedades', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('enfermedades').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ruta para obtener datos de la tabla "medicoPaciente"
app.get('/api/medicoPaciente', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('medicoPaciente').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ruta para obtener datos de la tabla "municipio"
app.get('/api/municipio', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('municipio').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ruta para obtener datos de la tabla "nivelMenopausia"
app.get('/api/nivelMenopausia', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('nivelMenopausia').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ruta para obtener datos de la tabla "parametrosPaciente"
app.get('/api/parametrosPaciente', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('parametrosPaciente').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ruta para obtener datos de la tabla "persona"
app.get('/api/persona', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('persona').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ruta para obtener datos de la tabla "personaEnfermedad"
app.get('/api/personaEnfermedad', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('personaEnfermedad').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ruta para obtener datos de la tabla "recetas"
app.get('/api/recetas', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('recetas').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ruta para obtener datos de la tabla "registroDiarioPaciente"
app.get('/api/registroDiarioPaciente', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('registroDiarioPaciente').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ruta para obtener datos de la tabla "rol"
app.get('/api/rol', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('rol').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ruta para obtener datos de la tabla "saludGeneral"
app.get('/api/saludGeneral', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('saludGeneral').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ruta para obtener datos de la tabla "sintomas"
app.get('/api/sintomas', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('sintomas').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Ruta para obtener datos de la tabla "sintomasPaciente"
app.get('/api/sintomasPaciente', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('sintomasPaciente').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
