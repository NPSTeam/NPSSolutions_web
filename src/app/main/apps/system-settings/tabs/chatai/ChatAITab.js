import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

export default function ChatAITab() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPEN_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.5,
        max_tokens: 100,
      });
      setResult(response.data.choices[0].text);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <main className="main">
      <div className="w-2/4 mx-auto">
        <textarea
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          className="textarea"
        />

        <button
          type="button"
          onClick={handleClick}
          disabled={loading || !prompt}
          className="button"
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>

        <pre className="pre">{result}</pre>
      </div>
    </main>
  );
}
