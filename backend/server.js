require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

app.post('/api/enviar-a-chatgpt', async (req, res) => {
  try {
    const { image } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini", // Cambia al modelo con visión si tenés acceso
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "¿Qué ves en esta captura?" },
            { type: "image_url", image_url: { url: image } }
          ]
        }
      ],
      max_tokens: 500,
    });

    res.json({ respuesta: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error procesando la imagen" });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
